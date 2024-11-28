import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Grid, Button, Box, TextField } from '@mui/material';
import { SET_RECIPIES, SET_SELECTED_RECIPE } from '../redux/action';

// עיצוב הכפתורים
const buttonStyle = {
    marginBottom: '10px',
    border: '1px solid lightgray', // מסגרת
    borderRadius: '4px', // פינות מעוגלות
    width: '100%', // רוחב הכפתור
    padding: '10px' // ריווח פנימי
};

const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%', // יבטיח שהכרטיסים יתפסו את כל הגובה
    width: '100%', // יבטיח שהכרטיסים יתפסו את כל הרוחב
    maxWidth: '300px', // רוחב מרבי לכרטיסים
    margin: 'auto' // מרכז את הכרטיסים בתוך ה-Grid
};

const ListRecipe = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const recipes = useSelector(state => state.recipes);

    const [filterDuration, setFilterDuration] = useState('');
    const [category, setCategory] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [difficulty, setDifficulty] = useState('');
    const [difficultyDropdownOpen, setDifficultyDropdownOpen] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8080/api/recipe")
            .then(res => {
                dispatch({ type: SET_RECIPIES, data: res.data });
            })
            .catch(err => {
                alert(err.response?.data);
            });

        axios.get("http://localhost:8080/api/category")
            .then(res => {
                setCategoryList(res.data);
            })
            .catch(err => {
                console.error("Error fetching categories", err);
            });
    }, [dispatch]);

    const handleDurationChange = (event) => {
        setFilterDuration(event.target.value);
    };

    const filteredRecipes = recipes.filter(r => {
        const matchesDuration = filterDuration ? r.Duration === parseInt(filterDuration) : true;
        const matchesCategory = category ? r.CategoryId === category : true;

        let difficultyLevel = 0;
        if (difficulty === "קל") {
            difficultyLevel = 1;
        } else if (difficulty === "בינוני") {
            difficultyLevel = 2;
        } else if (difficulty === "קשה") {
            difficultyLevel = 3;
        }

        const matchesDifficulty = difficulty ? r.Difficulty === difficultyLevel : true;
        return matchesDuration && matchesCategory && matchesDifficulty;
    });

    return (
        <>
            {user === null ? navigate('/homepage') : null}
            <div className="container">
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <TextField
                        label="סנן לפי משך זמן (בדקות)"
                        type="number"
                        value={filterDuration}
                        onChange={handleDurationChange}
                        variant="outlined"
                        style={buttonStyle}
                    />
                </div>

                <div style={{ marginBottom: '20px', textAlign: 'center', position: 'relative' }}>
                    <Button
                        style={buttonStyle}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        סנן לפי קטגוריה
                    </Button>

                    {dropdownOpen && (
                        <div style={{ position: 'absolute', zIndex: 1000, width: '20%', backgroundColor: 'white', border: '1px solid lightgray', borderRadius: '4px' }}>
                            {categoryList.map((c) => (
                                <div key={c.Id} onClick={() => {
                                    setCategory(c.Id);
                                    setDropdownOpen(false);
                                }} style={{ padding: '10px', cursor: 'pointer', textAlign: 'center' }}>
                                    {c.Name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Grid container spacing={4} justifyContent="center">
                    {filteredRecipes.map((r) => (
                        <Grid item key={r.Id} xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
                            <Card
                                className="card-recipe"
                                style={cardStyle}
                                onClick={() => {
                                    dispatch({ type: SET_SELECTED_RECIPE, data: r });
                                }}
                            >
                                <CardMedia component="img" height="200" image={r.Img} alt={r.Name} />
                                <CardContent>
                                    <Typography variant="h5" component="div">{r.Name}</Typography>
                                    <Typography variant="body2" color="textSecondary">{r.Description}</Typography>
                                </CardContent>
                                <Link
                                    to={`/allRecipes/${r.Id}`}
                                    title="לצפיה במתכון המלא"
                                    style={{ color: 'blue', textDecoration: 'underline' }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    לצפיה במתכון המלא
                                </Link>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default ListRecipe;

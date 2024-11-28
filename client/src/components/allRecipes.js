import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Icon, Card, Button, Header, Image, SegmentGroup } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { ADD_TO_CART, SET_RECIPIES } from '../redux/action';
import axios from 'axios';
import Swal from 'sweetalert2';

const AllRecipes = () => {
    const user = useSelector(state => state.user);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const recipes = useSelector(state => state.recipes);

    if (!recipes) {
        return <div>Loading...</div>;
    }

    const recipe = recipes.find(r => r.Id == id);

    const handleAddToCart = (prodToAdd) => {
        axios.post(`http://localhost:8080/api/bay/`, { ...prodToAdd, UserId: user.Id })
            .then(() => {
                dispatch({ type: ADD_TO_CART, data: prodToAdd });
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "המוצר נוסף לעגלה בהצלחה",
                    showConfirmButton: false,
                    timer: 1000
                });
            })
            .catch(() => {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "שגיאה! המוצר לא נוסף",
                    showConfirmButton: false,
                    timer: 1000
                });
            });
    };

    const handleDeleteRecipe = (id) => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק את המתכון?")) {
            axios.post(`http://localhost:8080/api/recipe/delete/${id}`)
                .then(() => {
                    const updatedRecipes = recipes.filter(recipe => recipe.Id !== id);
                    dispatch({ type: SET_RECIPIES, data: updatedRecipes });
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "המתכון נימחק בהצלחה",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/listRecipe");
                })
                .catch(err => {
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "שגיאה במחיקת המתכון",
                        showConfirmButton: false,
                        timer: 1500
                    });
                });
        }
    };

    return (
        <div className="container">
            {recipe ? (
                <Card className="card-recipe">
                    <Image src={recipe.Img} wrapped />
                    <Card.Content>
                        <Header as='h1' textAlign='center'>{recipe.Name}</Header>
                        <SegmentGroup>
                            <Segment>
                                <Icon name='clock' /> {recipe.Duration} דקות
                            </Segment>
                            <Segment>
                                <Icon name='list' /> {recipe.Category}
                            </Segment>
                        </SegmentGroup>
                        <p>{recipe.Description}</p>
                        <Header as='h3'>רכיבים</Header>
                        <SegmentGroup>
                            {recipe.Ingrident.map((ingredient, index) => (
                                <Segment key={index}>
                                    <Icon name="plus" /> {ingredient.Count} {ingredient.Type} {ingredient.Name}
                                    <Button onClick={() => handleAddToCart(ingredient)} primary floated='right'>
                                        הוסף לעגלה
                                    </Button>
                                </Segment>
                            ))}
                        </SegmentGroup>
                        <Header as='h3'>הוראות הכנה</Header>
                        <SegmentGroup>
                            {recipe.Instructions.map((instruction, index) => (
                                <Segment key={index}>
                                    <Icon name="circle" size="tiny" />
                                    {instruction}
                                </Segment>
                            ))}
                        </SegmentGroup>
                    </Card.Content>
                    {user.Id === recipe.UserId && (
                        <Card.Content extra>
                            <Button icon onClick={() => handleDeleteRecipe(recipe.Id)} color='red' floated="left">
                                <Icon name='trash alternate' />
                            </Button>
                            <Button icon onClick={() => navigate(`/editRecipe/${recipe.Id}`)} color='blue' floated="right">
                                <Icon name='edit' />
                            </Button>
                        </Card.Content>
                    )}
                </Card>
            ) : (
                <p>מתכון לא נמצא או שגיאה בטעינת נתונים</p>
            )}
        </div>
    );
};

export default AllRecipes;

import * as React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Box, Button, FormGroup, Grid, Icon, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SET_RECIPIES } from '../redux/action';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { EDIT_RECIPE } from '../redux/action';


const EditRecipe = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { id } = useParams();
    const recipes = useSelector(state => state.recipes); // בדוק את המתכונים
    const recipe = recipes?.find(r => r.Id == id);
    if (!recipe /*|| recipe.UserId != user.Id*/) {
        navigate('/listRecipe')
    }
    const category = useSelector((state) => state.category);
    const { handleSubmit, control, register } = useForm({});

    const { fields: fieldIngredient, append: appendIngredient, remove: removeIngredient } = useFieldArray({
        control,
        name: 'Ingrident',  // שים לב לשינוי כאן
    });
    const { fields: fieldInstructions, append: appendInstruction, remove: removeInstruction } = useFieldArray({
        control,
        name: 'Instructions',
    });

    const onSubmit = (data) => {
        console.log("EDIT   Recipe state:", recipe);
        let responseRecipe;
        let recipeToSend = { ...data, UserId: user.Id, Id: id }
        console.log("dataaaa =", recipeToSend);
        axios.post(`http://localhost:8080/api/recipe/edit`, recipeToSend)
            .then(res => {
                console.log('res', res);
                responseRecipe = res.data;
                dispatch({ type: EDIT_RECIPE, data: responseRecipe });
                navigate('/listRecipe');
            })
            .catch(err => alert(err.response.data));
    }

    React.useEffect(() => {
        recipe?.Ingrident?.map((ing) => appendIngredient(ing));
        recipe?.Instructions?.map((ins) => appendInstruction(ins));
    }, [recipe]);

    return (<>
        <div>edit</div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
                <label>שם מתכון</label>
                <Input {...register("Name")} defaultValue={recipe?.Name} />
            </FormGroup>

            <FormGroup>
                <label>קטגוריה</label>
                <select {...register("CategoryId")}>
                    {category?.map((r) => (
                        <option key={r.Id} value={r.Id}>{r.Name}</option>
                    ))}
                </select>
            </FormGroup>

            <FormGroup>
                <label>רמת קושי</label>
                <Input {...register("Difficulty")} defaultValue={recipe?.Difficulty} />
            </FormGroup>

            <FormGroup>
                <label>קישור לתמונה</label>
                <Input {...register("Img")} defaultValue={recipe?.Img} />
            </FormGroup>

            <FormGroup>
                <label>תיאור</label>
                <Input {...register("Description")} defaultValue={recipe?.Description} />
            </FormGroup>

            <FormGroup>
                <label>זמן הכנה בדקות</label>
                <Input {...register("Duration")} defaultValue={recipe?.Duration} />
            </FormGroup>

            {/* רכיבים */}
            <label>רכיבים</label>
            <br />
            {fieldIngredient.map((ingredient, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                    <Grid item xs={4}>
                        <Input {...register(`Ingrident.${index}.Name`)} defaultValue={ingredient?.Name} placeholder="שם מוצר" />
                    </Grid>
                    <Grid item xs={3}>
                        <Input {...register(`Ingrident.${index}.Count`)} defaultValue={ingredient?.Count} placeholder="כמות" />
                    </Grid>
                    <Grid item xs={3}>
                        <Input {...register(`Ingrident.${index}.Type`)} defaultValue={ingredient?.Type} placeholder="סוג" />
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={() => removeIngredient(index)}>
                            <Icon name="trash alternate" />
                        </Button>
                    </Grid>
                </Grid>
            ))}

            <Button
                variant="text"
                onClick={() => appendIngredient({ Name: '', Count: 0, Type: '' })}
                startIcon={<AddIcon />}
            >
                הוסף מוצר
            </Button>

            <br />
            {/* הוראות הכנה */}
            <label>הוראות הכנה</label>
            {fieldInstructions.map((instruction, index) => (
                <Grid container spacing={2} key={index} alignItems="center">
                    <Grid item xs={10}>
                        <Input {...register(`Instructions.${index}`)} defaultValue={instruction} placeholder="הוראת הכנה" />
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={() => removeInstruction(index)}>
                            <Icon name="trash alternate" />
                        </Button>
                    </Grid>
                </Grid>
            ))}

            <Button
                variant="text"
                onClick={() => appendInstruction('')}
                startIcon={<AddIcon />}
            >
                הוסף הוראה
            </Button>

            <br />

            {/* כפתור שמירה */}

            <Button type="submit">שמור</Button>
        </form>
    </>);
};

export default EditRecipe;

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import { FormControl, FormControlState } from '@mui/base/FormControl';
// import { Input, inputClasses } from '@mui/base/Input';
// import { styled } from '@mui/system';
// import { useFieldArray, useForm } from 'react-hook-form';
// import axios from 'axios';
// import { Form } from 'semantic-ui-react';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { SET_RECIPIES } from '../redux/action';
// import { Button, FormGroup, Icon } from '@mui/material';
// import { useLocation } from 'react-router-dom';
// import AddIcon from '@mui/icons-material/Add';
// const AddRecipe = () => {
//     const dispatch = useDispatch();
//     const { state } = useLocation();
//     const recipe = state;
//     const category = useSelector(state => state.category)
//     const { handleSubmit, control } = useForm({});
//     const { field: fieldInstraction, append: appendInstraction, remove: removeInstraction } =
//         useFieldArray({
//             control,
//             name: "Instractions"
//         });
//     const { field: fieldIngredient, append: appendIngredient, remove: removeIngredient } =
//         useFieldArray({
//             control,
//             name: "Ingredients"
//         });


//     const edit = (data) => {
//         console.log(data)
//         axios.post("http://localhost:8080/api/recipe", data)
//             .then(res => {
//                 dispatch({ type: SET_RECIPIES, data: res.data })
//             })
//             .catch()


//     }
//     React.useEffect(() => {
//         recipe?.Ingredients?.map((ing) => appendIngredient(ing))
//         recipe?.Instractions?.map((ins) => {
//             appendInstraction(ins)
//         })
//     }, [recipe]);
//     return <>
//         <Form onSubmit={handleSubmit(edit)}>
//             <Form.Field>
//                 <label>שם מתכון</label>
//                 <Input defaultValue={recipe?.Name} />
//             </Form.Field>
//             <Form.Field>
//                 <label>קטגוריה</label><br />
//                 <select>
//                     {category?.map((r) => <option key={r.Id}>{r.Name}</option>)}
//                 </select>
//             </Form.Field>
//             <Form.Field>
//                 <label>רמת קושי</label>
//                 <Input defaultValue={recipe?.difficulty} />
//             </Form.Field>
//             <Form.Field>
//                 <label>קישור לתמונה</label>
//                 <Input defaultValue={recipe?.Name} />
//             </Form.Field>
//             <Form.Field>
//                 <label>תיאור</label>
//                 <Input defaultValue={recipe?.Descripation} />
//             </Form.Field>
//             <Form.Field>
//                 <label>זמן הכנה בדקות</label>
//                 <Input defaultValue={recipe?.Duration} />
//             </Form.Field>
//             <label>רכיבים</label><br />
//             {fieldIngredient?.map((ingredient, index) =>
//                 <FormGroup key={index}>
//                     <Form.Field>
//                         <label>שם המוצר</label>
//                         <Input defaultValue={ingredient?.Name} placeholder="שם מוצר" />
//                     </Form.Field>
//                     <Form.Field>
//                         <label>כמות</label>
//                         <Input defaultValue={ingredient?.Count} placeholder="כמות" />
//                     </Form.Field>
//                     <Form.Field>
//                         <label>סוג</label>
//                         <Input defaultValue={ingredient?.Type} placeholder="סוג" />
//                     </Form.Field>
//                     <Button onClick={() => removeIngredient(index)}>
//                         <Icon /*color="yellow"*/ name='trash alternate' />
//                     </Button>
//                 </FormGroup>)}
//             <Button variant='text' onClick={() => appendIngredient({ Name: "", Count: 0, Type: "" })}>
//                 <Icon name="plus" style={{ margin: 10 }} />  הוסף מוצר
//             </Button>
//             <br />
//             <label>הוראות הכנה</label><br />
//             {fieldInstraction?.map((field, index) =>
//                     <FormGroup>
//                         <Form.Field>
//                             <label>הוסף מוצר</label>
//                             <Input defaultValue={field?.Instraction} />
//                         </Form.Field>
//                         <Button onClick={() => removeInstraction(index)}>
//                             <Icon /*color="yellow"*/ name='trash alternate' />
//                         </Button>
//                     </FormGroup>
//             )}
//             <Button variant='text' onClick={() => appendInstraction(null)}>
//                 {/* <Icon name="plus" style={{ margin: 10 }} /> */}
//                 הוסף הוראה
//             </Button>
//         </Form >
//         <input type='submit' value="submit" />
//     </>


// }
// export default AddRecipe;








// import * as React from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { Box, Button, FormGroup, Grid, Icon, Input } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { SET_RECIPIES } from '../redux/action';
// import { useLocation } from 'react-router-dom';

// const AddRecipe = () => {
//     const dispatch = useDispatch();
//     const { state } = useLocation();
//     const recipe = state;
//     const category = useSelector((state) => state.category);
//     const { handleSubmit, control } = useForm({});

//     const { fields: fieldIngredient, append: appendIngredient, remove: removeIngredient } = useFieldArray({
//         control,
//         name: 'Ingredients',
//     });
//     const { fields: fieldInstructions, append: appendInstruction, remove: removeInstruction } = useFieldArray({
//         control,
//         name: 'Instructions',
//     });

//     const edit = (data) => {
//         console.log(data);
//         axios
//             .post('http://localhost:8080/api/recipe', data)
//             .then((res) => {
//                 dispatch({ type: SET_RECIPIES, data: res.data });
//             })
//             .catch((error) => {
//                 console.error(error); // הדפסת השגיאה כאן
//             });
//     };

//     React.useEffect(() => {
//         recipe?.Ingredients?.map((ing) => appendIngredient(ing));
//     }, [recipe]);

//     return (
//         <form onSubmit={handleSubmit(edit)}>
//             <FormGroup>
//                 <label>שם מתכון</label>
//                 <Input defaultValue={recipe?.Name} />
//             </FormGroup>

//             <FormGroup>
//                 <label>קטגוריה</label>
//                 <select>
//                     {category?.map((r) => (
//                         <option key={r.Id}>{r.Name}</option>
//                     ))}
//                 </select>
//             </FormGroup>

//             <FormGroup>
//                 <label>רמת קושי</label>
//                 <Input defaultValue={recipe?.difficulty} />
//             </FormGroup>

//             <FormGroup>
//                 <label>קישור לתמונה</label>
//                 <Input defaultValue={recipe?.Img} />
//             </FormGroup>

//             <FormGroup>
//                 <label>תיאור</label>
//                 <Input defaultValue={recipe?.Description} />
//             </FormGroup>

//             <FormGroup>
//                 <label>זמן הכנה בדקות</label>
//                 <Input defaultValue={recipe?.Duration} />
//             </FormGroup>

//             {/* רכיבים */}
//             <label>רכיבים</label>
//             <br/>
//             {fieldIngredient?.map((ingredient, index) => (
//                 <Grid container spacing={2} key={index} alignItems="center">
//                     <Grid item xs={4}>
//                         <Input defaultValue={ingredient?.Name} placeholder="שם מוצר" />
//                     </Grid>
//                     <Grid item xs={3}>
//                         <Input defaultValue={ingredient?.Count} placeholder="כמות" />
//                     </Grid>
//                     <Grid item xs={3}>
//                         <Input defaultValue={ingredient?.Type} placeholder="סוג" />
//                     </Grid>
//                     <Grid item xs={2}>
//                         <Button onClick={() => removeIngredient(index)}>
//                             <Icon name="trash alternate" />
//                         </Button>
//                     </Grid>
//                 </Grid>
//             ))}

//             {/* כפתור הוסף מוצר */}
//             <Button
//                 variant="text"
//                 onClick={() =>
//                     appendIngredient({ Name: '', Count: 0, Type: '' })
//                 }
//                 startIcon={<AddIcon />}
//             >
//                 הוסף מוצר
//             </Button>

//             <br />
//              {/* הוראות הכנה */}
//              <label>הוראות הכנה</label>
//             {fieldInstructions?.map((instruction, index) => (
//                 <Grid container spacing={2} key={index} alignItems="center">
//                     <Grid item xs={10}>
//                         <Input defaultValue={instruction} placeholder="הוראה" />
//                     </Grid>
//                     <Grid item xs={2}>
//                         <Button onClick={() => removeInstruction(index)}>
//                             <Icon name="trash alternate" />
//                         </Button>
//                     </Grid>
//                 </Grid>
//             ))}

//             <Button
//                 variant="text"
//                 onClick={() =>
//                     appendInstruction('')
//                 }
//                 startIcon={<AddIcon />}
//             >
//                 הוסף הוראה
//             </Button>

//             <br />

//             {/* כפתור שמירה */}
//             <Button type="submit">שמור</Button>
//         </form>
//     );
// };

// export default AddRecipe;









import * as React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Box, Button, Card, FormGroup, Grid, Icon, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_RECIPE } from '../redux/action';
import { useLocation, useNavigate } from 'react-router-dom';

const AddRecipe = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { state } = useLocation();
    const recipe = state;
    const category = useSelector((state) => state.category);
    const navigate = useNavigate();
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
        console.log("add recipe Recipe state:", recipe);
        console.log("ghjgfdghjgfdghgfdgh");

        let responseRecipe;
        let recipeToSend = { ...data, UserId: user.Id }
        console.log("רקבןפק אם דקמג ", recipeToSend);
        axios.post(`http://localhost:8080/api/recipe`, recipeToSend)
            .then(res => {
                responseRecipe = res.data;
                dispatch({ type: ADD_RECIPE, data: responseRecipe });
                navigate('/listRecipe');
            })
            .catch(err => alert(err.response.data));
        // }
        // navigate('/recipe');
    }

    React.useEffect(() => {
        recipe?.Ingrident?.map((ing) => appendIngredient(ing));
        recipe?.Instructions?.map((ins) => appendInstruction(ins));
    }, [recipe]);

    return (<>
        <Card
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
        >
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
        </Card>
    </>);
};

export default AddRecipe;

const Category=()=>{
    <Form onSubmit={handleSubmit(addcategory)}>
    <Form.Field>
        <label>סוג קטגוריה</label>
        <Input defaultValue={recipe?.Instructions}/>
    </Form.Field>


</Form>

}
export default Category
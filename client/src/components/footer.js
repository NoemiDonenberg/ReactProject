
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import EmailIcon from '@mui/icons-material/Email';
const footer = () => {
    //const nav=useNavigate();


    return (<>
        <footer style={Object.assign({ backgroundColor: "#2e7d32" }, { color: 'white' }, { height: "fit-content" })}>

            <div><PhoneEnabledIcon /> 0534182726</div>
            <div><EmailIcon />  naomi@gmail.com</div>
        </footer>
    </>)

}
export default footer;
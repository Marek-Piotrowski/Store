import { AppBar, FormControlLabel, FormGroup, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
    darkMode: boolean,
    onChange: ()=> void,
}

export default function Header({ onChange, darkMode }: Props) {
    return (
        <AppBar position="static" sx={{ mb: 2 }}>
            <Toolbar>
                <Typography variant="h6"> Homemade Shoes</Typography>
                <FormGroup>
                    <FormControlLabel control={<Switch checked={darkMode } onChange={onChange} />} label="Dark mode" />
                </FormGroup>
            </Toolbar>
            
        </AppBar>
        )
}
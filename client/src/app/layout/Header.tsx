import { AppBar, Badge, Box, FormControlLabel, FormGroup, IconButton, List, ListItem, Switch, Toolbar } from "@mui/material";
import { Link as RouterLink, NavLink } from "react-router-dom";
import Link from '@mui/material/Link';
import { ShoppingCart } from "@mui/icons-material";
import { useStoreContext } from "../context/StoreContext";

interface Props {
    darkMode: boolean,
    onChange: ()=> void,
}

export default function Header({ onChange, darkMode }: Props) {
    const {basket} = useStoreContext();
    const itemCount = basket?.items.reduce((sum,item)=>sum + item.quantity, 0)

    return (
        <AppBar position="static" sx={{ mb: 2 }}>
            <Toolbar sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Box sx={{display:"flex"}}>
                    <Link
                    component={RouterLink}
                    variant="h6"
                    to="/"
                    underline="none"
                    sx={{color: '#fff',"&:hover": { color: "secondary" }}}
                    >
                    Homemade Shoes
                    </Link>

                    <FormGroup sx={{ ml: 2 }}>
                        <FormControlLabel control={<Switch checked={darkMode } onChange={onChange} />} label="Dark mode" />
                    </FormGroup>
                </Box>
                <Box >
                    <List sx={{display:"flex"}}>
                        <ListItem >
                             <Link
                                component={NavLink}
                                variant="h6"
                                to="/catalog"
                                underline="hover"
                                sx={{color: '#fff','&:hover': { color: "secondary" }}}
                                >
                                CATALOG
                            </Link>
                        </ListItem>
                        <ListItem >
                             <Link
                                component={RouterLink}
                                variant="h6"
                                to="/contact"
                                underline="none"
                                sx={{color: '#fff'}}
                                >
                                CONTACT
                            </Link>
                        </ListItem>
                        <ListItem >
                             <Link
                                component={RouterLink}
                                variant="h6"
                                to="/about"
                                underline="none"
                                sx={{color: '#fff',}}
                                >
                                ABOUT
                            </Link>
                        </ListItem>
                    </List>
                </Box>

                <Box sx={{display:"flex"}}>
                    <IconButton component={RouterLink} to="/basket" size="large" color="inherit">
                        <Badge badgeContent={itemCount} color="secondary">
                            <ShoppingCart/>
                        </Badge>
                    </IconButton>
                    <List sx={{display:"flex"}}>
                        <ListItem >
                                <Link
                                    component={RouterLink}
                                    variant="h6"
                                    to="/login"
                                    underline="none"
                                    sx={{color: '#fff'}}
                                    >
                                    LOGIN
                                </Link>
                        </ListItem>
                        <ListItem >
                                <Link
                                    component={RouterLink}
                                    variant="h6"
                                    to="/register"
                                    underline="none"
                                    sx={{color: '#fff'}}
                                    >
                                    REGISTER
                                </Link>
                        </ListItem>
                    </List>
                </Box>
            </Toolbar>

        </AppBar>
        )
}
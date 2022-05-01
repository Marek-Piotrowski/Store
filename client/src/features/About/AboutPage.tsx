import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, ListItemText, Typography } from "@mui/material"
import agent from "../../app/api/agent"
import { useState } from "react";

export default function AboutPage() {

    const [validationErrors, SetvalidationErrors] = useState<string[]>([]);

    function getValidationErrors(){
        agent.testErrors.geValidationError()
        .then(()=> console.log("test"))
        .catch(error => SetvalidationErrors(error))
    }
    return (
        <Container>
            <Typography gutterBottom variant="h2"> Error for testing purposes</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={()=> agent.testErrors.get400Error().catch(error=> console.log(error))}>
                    test 400 error
                </Button>
                <Button variant="contained" onClick={()=> agent.testErrors.get401Error().catch(error=> console.log(error))}>
                    test 401 error
                </Button>
                <Button variant="contained" onClick={()=> agent.testErrors.get404Error().catch(error=> console.log(error))}>
                    test page not found 404 error
                </Button>
                <Button variant="contained" onClick={()=> agent.testErrors.get500Error().catch(error=> console.log(error))}>
                    test server 500 error
                </Button>
                <Button variant="contained" onClick={getValidationErrors}>
                    test validation error
                </Button>
            </ButtonGroup>
            {validationErrors.length > 0 &&
                <Alert severity="error">
                    <AlertTitle>
                        Validation errors
                    </AlertTitle>
                    <List>
                        {validationErrors.map((error)=> (
                            <ListItem key={error}>
                                <ListItemText>
                                    {error}
                                </ListItemText>
                            </ListItem>
                        ) )}
                    </List>
                </Alert>
            }
        </Container>
        )
}
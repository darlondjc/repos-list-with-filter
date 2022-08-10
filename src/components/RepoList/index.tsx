import { GitHub } from "@mui/icons-material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import { Repository } from "../Repositorios";

export function RepoList(props: any) {
    return (
        <div>
            <Typography variant="h5" component="div" gutterBottom>
                Lista de repositórios
            </Typography>
            <Paper elevation={3}>
                <List>
                    {props.lista?.map((repo: Repository) => {
                        //console.log(repo);
                        return (
                            <ListItemButton key={repo.name}>
                                <ListItemIcon>
                                    <GitHub />
                                </ListItemIcon>
                                <ListItem component="a" href={repo.html_url} target="_blank">
                                    <ListItemText primary={repo.name.toLowerCase() + (repo.archived ? ' (Arquivado)' : '')} secondary={repo.description} />
                                </ListItem>
                            </ListItemButton>
                        );
                    })}
                </List>
            </Paper>
        </div >
    );
}
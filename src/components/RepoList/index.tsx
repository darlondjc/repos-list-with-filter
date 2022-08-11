import { GitHub } from "@mui/icons-material";
import { Box, Chip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import React from "react";
import { Repository } from "../Repositorios";

export function RepoList(props: any) {
    return (
        <Box sx={{ marginTop: 2, marginLeft: 20, marginRight: 20 }}>
            <Typography variant="h6" component="div" gutterBottom>
                Repositórios
            </Typography>
            <Paper elevation={3}>
                <List>
                    {props.lista?.map((repo: Repository) => {
                        console.log(repo);
                        return (
                            <ListItemButton key={repo.name}>
                                <ListItemIcon>
                                    <GitHub color="primary"/>
                                </ListItemIcon>
                                <ListItem component="a" href={repo.html_url} target="_blank">
                                    <ListItemText
                                        primary={repo.name.toLowerCase() + (repo.archived ? ' (Arquivado)' : '')}
                                        secondary={repo.description}/>
                                    {repo.language && <Chip color="primary" label={repo.language} />}
                                </ListItem>
                            </ListItemButton>
                        );
                    })}
                </List>
            </Paper>
        </Box >
    );
}
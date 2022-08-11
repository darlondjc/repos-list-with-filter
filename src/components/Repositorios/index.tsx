import axios from "axios";
import { useEffect, useState } from "react";
import { RepoList } from "../RepoList";
import TextField from '@mui/material/TextField';
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box, Grid } from "@mui/material";

export type Repository = {
    name: string,
    description: string,
    archived: boolean,
    html_url: string,
    language: string
};

const urlGitHub = 'https://api.github.com/users/darlondjc/repos';

export function Repositorios() {
    const onlyArchivedRepos = useFormInput(false, 'b');
    const termoPesquisa = useFormInput('', 's');

    const buscaDeRepositorios = buscaRepositorios();
    const listaFilteredRepos = buscaDeRepositorios.repositories?.filter(repo => {
        if (onlyArchivedRepos.value) {
            if (termoPesquisa.value != null) {
                return repo.archived && repo.name.includes(termoPesquisa.value);
            } else {
                return repo.archived;
            }
        } else {
            return repo.name.toLowerCase().includes(termoPesquisa.value.toLowerCase());
        }
    });
    //console.log(listaFilteredRepos);

    return (
        <Box sx={{ marginTop: 5 }}>
            <Grid container>
                <Grid item xs={4} />
                <Grid item xs={3}>
                    <TextField id="outlined-basic" sx={{ width: '95%' }} label="Repo a ser pesquisado..." variant="outlined" size="small" {...termoPesquisa} />
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox {...onlyArchivedRepos} inputProps={{ 'aria-label': 'controlled' }} />} label="Arquivados" />
                    </FormGroup>
                </Grid>
                <Grid item xs={4} />
            </Grid>
            {buscaDeRepositorios.isFetching && <p>Carregando...</p>}
            <RepoList lista={listaFilteredRepos} />
        </Box>
    );

}

function buscaRepositorios() {
    const [repositories, setRepositories] = useState<Repository[] | null>(null);
    const [isFetching, setIsFetching] = useState(true);

    /*assim que a tela for carregada*/
    useEffect(() => {
        axios.get(urlGitHub)
            .then(response => setRepositories(response.data))
            .finally(() => setIsFetching(false));
    }, []);

    return { repositories, isFetching };
}

function useFormInput(initialValue: any, type: string) {
    const [value, setValue] = useState(initialValue);

    function handleChange(event: any) {
        if (type === 's') {
            setValue(event.target.value);
        } else {
            setValue(event.target.checked);
        }
    }

    return {
        value,
        onChange: handleChange
    }
}

export default Repositorios
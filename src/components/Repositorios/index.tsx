import axios from "axios";
import { useEffect, useState } from "react";
import { RepoList } from "../RepoList";

export type Repository = {
    name: string;
    description: string;
    archived: boolean;
    html_url: string;
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
        <div>
            <form>
                <input type="text" placeholder="Repo a ser pesquisado..." {...termoPesquisa} />
                <p>
                    <input type="checkbox" {...onlyArchivedRepos} /> {' '} Arquivados
                </p>
            </form>
            {buscaDeRepositorios.isFetching && <p>Carregando...</p>}
            <RepoList lista={listaFilteredRepos} />
        </div>
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
        if (type === 's'){
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
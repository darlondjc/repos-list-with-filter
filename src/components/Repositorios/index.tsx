import axios from "axios";
import { useEffect, useState } from "react";
import { RepoList } from "../RepoList";
import { SearchBar } from "../SearchBar";

export type Repository = {
    name: string;
    description: string;
    archived: boolean;
    html_url: string;
};

export type StateData = {
    onlyArchivedRepos: boolean,
    termoPesquisa: string,
    isFetching: boolean;
    repositories: Repository[] | null
};

const urlGitHub = 'https://api.github.com/users/darlondjc/repos';

export function Repositorios() {
    const [repositories, setRepositories] = useState<Repository[] | null>(null);
    const [isFetching, setIsFetching] = useState(true);
    const [onlyArchivedRepos, setOnlyArchivedRepos] = useState(false);
    const [termoPesquisa, setTermoPesquisa] = useState('');

    /*assim que a tela for carregada*/
    useEffect(() => {
        useFetch(urlGitHub);
    }, []);

    function useFetch(url: string) {
        axios.get(url)
            .then(response => setRepositories(response.data))
            .finally(() => setIsFetching(false));
    }

    function handleChangeTexto(event: any) {
        setTermoPesquisa(event.target.value);
    }

    function handleChangeCheckbox(event: any) {
        setOnlyArchivedRepos(event.target.checked);
    }

    const listaFilteredRepos = repositories?.filter(repo => {
        if (onlyArchivedRepos) {
            if (termoPesquisa != null) {
                return repo.archived && repo.name.includes(termoPesquisa);
            } else {
                return repo.archived;
            }
        } else {
            return repo.name.toLowerCase().includes(termoPesquisa.toLowerCase());
        }
    });
    //console.log(listaFilteredRepos);

    return (
        <div>
            <SearchBar
                privateRepos={onlyArchivedRepos}
                termo={termoPesquisa}
                onChangeTexto={handleChangeTexto}
                onChangeCheckbox={handleChangeCheckbox}
            />
            {isFetching && <p>Carregando...</p>}
            <RepoList lista={listaFilteredRepos} />
        </div>
    );

}

export default Repositorios
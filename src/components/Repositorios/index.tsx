import axios from "axios";
import React from "react";
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

class Repositorios extends React.Component<{}, StateData> {

    constructor(props: any) {
        super(props);
        this.state = {
            onlyArchivedRepos: false,
            termoPesquisa: '',
            isFetching: false,
            repositories: null
        };

        this.handleChangeTexto = this.handleChangeTexto.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    useFetch(url: string) {
        axios.get(url)
            .then(response => this.setState({ repositories: response.data }))
            .finally(() => this.setState({ isFetching: false }));
    }

    componentDidMount() {
        this.useFetch(urlGitHub);
    }

    handleChangeTexto(event: any) {
        this.setState({ termoPesquisa: event.target.value });
    }

    handleChangeCheckbox(event: any) {
        this.setState({ onlyArchivedRepos: event.target.checked });
    }

    render() {
        //console.log(this.state);

        const listaFilteredRepos = this.state.repositories?.filter(repo => {
            if (this.state.onlyArchivedRepos) {
                if (this.state.termoPesquisa != null) {
                    return repo.archived && repo.name.includes(this.state.termoPesquisa);
                } else {
                    return repo.archived;
                }
            } else {
                return repo.name.toLowerCase().includes(this.state.termoPesquisa.toLowerCase());
            }
        });
        //console.log(listaFilteredRepos);

        return (
            <div>
                <SearchBar
                    privateRepos={this.state.onlyArchivedRepos}
                    termo={this.state.termoPesquisa}
                    onChangeTexto={this.handleChangeTexto}
                    onChangeCheckbox={this.handleChangeCheckbox}
                />
                {this.state.isFetching && <p>Carregando...</p>}
                <RepoList lista={listaFilteredRepos} />
            </div>
        );
    }
}

export default Repositorios
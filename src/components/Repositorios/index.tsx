import React from "react";
import { Repository } from "../../App";
import { RepoList } from "../RepoList";
import { SearchBar } from "../SearchBar";

export type StateData = {
    onlyArchivedRepos: boolean,
    termoPesquisa: string
}

export type PropsData = {
    isFetching: boolean;
    repositories: Repository[] | null
};

class Repositorios extends React.Component<PropsData, StateData> {
    constructor(props: any) {
        super(props);
        this.state = {
            onlyArchivedRepos: false,
            termoPesquisa: ''
        };

        this.handleChangeTexto = this.handleChangeTexto.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    handleChangeTexto(event: any) {
        this.setState({ termoPesquisa: event.target.value });
    }

    handleChangeCheckbox(event: any) {
        this.setState({ onlyArchivedRepos: event.target.checked });
    }

    render() {
        //console.log(this.state);

        const listaFilteredRepos = this.props.repositories?.filter(repo => {
            if (this.state.onlyArchivedRepos) {
                if (this.state.termoPesquisa != null) {
                    return repo.archived && repo.full_name.includes(this.state.termoPesquisa);
                } else {
                    return repo.archived;
                }
            } else {
                return repo.full_name.includes(this.state.termoPesquisa);
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
                {this.props.isFetching && <p>Carregando...</p>}
                <RepoList lista={listaFilteredRepos} />
            </div>
        );
    }
}

export default Repositorios
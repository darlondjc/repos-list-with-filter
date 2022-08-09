import { Repository } from "../Repositorios";

export function RepoList(props: any) {
    return (
        <div>
            <hr />
            <h3>Lista de repositórios</h3>
            <ul>
                {props.lista?.map((repo: Repository) => {
                    console.log(repo);
                    return (
                        <li key={repo.name}>
                            <a href={repo.html_url} target="_blank">{repo.name.toLowerCase()}</a> {repo.archived && '(Arquivado)'} 
                            <p>{repo.description}</p>
                        </li>
                    );
                })}

            </ul>
        </div>
    );
}
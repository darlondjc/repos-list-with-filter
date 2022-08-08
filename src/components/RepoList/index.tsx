import { Repository } from "../../App";

export function RepoList(props: any) {
    return (
        <div>
            <hr />
            <h3>Lista de repositórios</h3>
            <ul>
                {props.lista?.map((repo: Repository) => {
                    //console.log(repo);
                    return (
                        <li key={repo.full_name}>
                            <a href={repo.html_url} target="_blank">{repo.full_name}</a> {repo.archived && '(Arquivado)'} 
                            <p>{repo.description}</p>
                        </li>
                    );
                })}

            </ul>
        </div>
    );
}
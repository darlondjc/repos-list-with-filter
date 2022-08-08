export function SearchBar(props: any) {
    return (
        <form>
            <input type="text" placeholder="Repo a ser pesquisado..." value={props.termo} onChange={props.onChangeTexto}/>
            <p>
                <input type="checkbox" value={props.onlyArchivedRepos} onChange={props.onChangeCheckbox}/> {' '} Arquivados
            </p>
        </form>
    );
}
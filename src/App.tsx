import axios from 'axios';
import { useEffect, useState } from 'react';
import Repositorios from './components/Repositorios'

export type Repository = {
  full_name: string;
  description: string;
  archived: boolean;
  html_url: string;
}

function App() {
  const urlGitHub = 'https://api.github.com/users/darlondjc/repos';
  const [repositories, setRepositories] = useState<Repository[] | null>([]);
  const [isFetching, setIsFetching] = useState(true);
  
  /*assim que a tela for carregada*/
  useEffect(() => {
    useFetch(urlGitHub);
  }, []);

  function useFetch(url: string) {
    axios.get(url)
      .then(response => setRepositories(response.data))
      .finally(() => setIsFetching(false));
  }

  return (
    <div className="App">
      <Repositorios repositories={repositories} isFetching={isFetching}/>
    </div>
  )
}

export default App

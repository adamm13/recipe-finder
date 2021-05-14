import React, {FormEvent, useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { iRecipe } from './iRecipe'
import { RecipeComponent } from './RecipeComponent'

function App() {

  const [recipesFound, setRecipesFound] = useState<iRecipe[]>([]);
  const [recipeSearch, setRecipeSearch] = useState ('');

  const searchForRecipes = async (query: string): Promise<iRecipe[]> => {
    const result = await fetch(`http://localhost:3001/?search=${query}`)
    return (await result.json()).results;
  }

  useEffect(() => {
    (async () => {
      const query = encodeURIComponent(recipeSearch);
      if (query) {
      const response = await searchForRecipes(query);
      setRecipesFound(response)
      }
    })();
  }, [recipeSearch]);

  const search = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector('#searchText') as HTMLInputElement;
    setRecipeSearch(input.value);
    input.value = '';
  };

  return (
    <div className="App">
      <h1>Recipe Search Up</h1>
      <form className = "searchForm" onSubmit={event => search(event)}>
        <input id = "searchText" type = "text"/>
        <button>Search</button>
      </form>
      {recipeSearch && <p>Results for {recipeSearch}...</p>}
      <div className="recipes-container">
        {recipesFound.length &&
          recipesFound.map(recipe =>
            (<RecipeComponent key={recipe.href} recipe={recipe}></RecipeComponent>))
        }
      </div>
    </div>
  );
}

export default App;
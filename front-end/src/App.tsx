import Home from './components/Home'
import RecipeSearchFunctionality from './components/RecipeSearchFunctionality'
function App() {
    return (
        <div className="bg-fixed bg-center bg-no-repeat bg-home-background md:bg-cover">
            <Home />
            <RecipeSearchFunctionality />
        </div>
    )
}

export default App
import Home from './components/Home'
import Form from './components/Form'
import RecipeSearchFunctionality from './components/RecipeSearchFunctionality'
function App() {
    return (
        <div className="bg-fixed bg-center bg-no-repeat bg-[url('/img/background.jpeg')] md:bg-cover">
            <Home />
            <RecipeSearchFunctionality />
            <Form />
        </div>
    )
}

export default App
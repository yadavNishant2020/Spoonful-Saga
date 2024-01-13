import Home from './Pages/Home'
import Form from './Pages/Form'
import RecipeSearchFunctionality from './components/RecipeSearchFunctionality'
function App() {
    return (
        <div className="bg-fixed bg-center bg-no-repeat bg-[url('/img/background.jpeg')] md:bg-cover">
            <Home />
            <RecipeSearchFunctionality />
            <Form onClose={() => console.log('Closing form')}  />
        </div>
    )
}

export default App
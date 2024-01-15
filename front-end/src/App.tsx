import Home from './Pages/Home'
import Form from './Pages/Form'
import RecipeSearchFunctionality from './components/RecipeSearchFunctionality'
import Features from './Pages/Features'
import Footer from './Pages/Footer'
function App() {
    return (
        <div className="bg-fixed bg-center bg-no-repeat bg-[url('/img/background.jpeg')] md:bg-cover">
            <Home />
            <Features />
            <Form onClose={() => console.log('Closing form')} />
            <RecipeSearchFunctionality />
            <Footer />
        </div>
    )
}

export default App
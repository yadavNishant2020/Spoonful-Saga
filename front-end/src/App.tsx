import Home from './Pages/Home';
import Form from './Pages/Form';
import RecipeSearchFunctionality from './components/RecipeSearchFunctionality';
import Features from './Pages/Features';
import Footer from './Pages/Footer';
import { Element } from 'react-scroll';

function App() {
    return (
        <div className="bg-fixed bg-center bg-no-repeat bg-[url('/img/background.jpeg')] md:bg-cover">
            <Element name="home">
                <Home />
            </Element>
            <Element name="features">
                <Features />
            </Element>
            <Element name="form">
            <Form onClose={() => console.log('Closing form')} />
            </Element>
            <Element name="search">
            <RecipeSearchFunctionality />
            </Element>
            <Footer />
        </div>
    );
}

export default App;

import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import MathQuiz from './components/math.jsx';
import './style.css'


function App() {

  return (
    <div>
      <Header />
      <main>
        <MathQuiz/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
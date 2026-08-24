import Header from './components/header.jsx'
import Footer from './components/footer.jsx'
import './style.css'


function App() {
  return (
    <div>
      <Header />
      <main>
        <h2>Welcome to My App</h2>
        <p>This is the main content area.</p>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
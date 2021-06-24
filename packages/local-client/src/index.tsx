import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom';
// import CodeCell from './components/code-cell';
import { Provider } from 'react-redux';
import configureStore from './state/store';
import TextEditor from './components/text-editor';
import CellList from './components/cell-list';
import { persistState } from './state/localStorage';

const store = configureStore();
store.subscribe(() => {
  persistState({
    cells: store.getState().cells,
    bundles: store.getState().bundles,
  });
});

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));

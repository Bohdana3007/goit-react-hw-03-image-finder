import { Component } from 'react';
import s from './App.module.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import waitingImg from './components/waiting.jpg';
import errorImg from './components/error.gif';
import Api from './services/pixabay-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    gallery: [],
    searchQueue: '',
    page: 1,
    status: Status.IDLE,
    error: null,
  };

  formSubmitHandler = searchQueue => {
    this.setState({
      searchQueue,
      page: 1,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQueue = prevState.searchQueue;
    const nextQueue = this.state.searchQueue;
    const page = this.state.page;

    if (prevQueue !== nextQueue) {
      this.setState({
        status: Status.PENDING,
      });
      Api.fetchImages(nextQueue, page)
        .then(data => {
          if (data.total < 1) {
            return Promise.reject(
              new Error(`Не удалось найти картинки по запросу ${nextQueue}`),
            );
          }
          this.setState(prevState => {
            return {
              gallery: data.hits,
              status: Status.RESOLVED,
              page: prevState.page + 1,
            };
          });
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  loadMoreHandler = () => {
    const nextQueue = this.state.searchQueue;
    const page = this.state.page;

    this.setState({
      status: Status.PENDING,
    });
    Api.fetchImages(nextQueue, page)
      .then(data => {
        this.setState(prevState => {
          return {
            gallery: [...prevState.gallery, ...data.hits],
            status: Status.RESOLVED,
            page: prevState.page + 1,
          };
        });
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  render() {
    const { status, gallery, error } = this.state;

    if (status === 'idle') {
      return (
        <div className={s.App}>
          <Searchbar onSubmit={this.formSubmitHandler} />
          <div className={s.waiting}>
            <p> Waiting for queue</p>
            <img src={waitingImg} alt="waiting" className={s.image} />
          </div>
        </div>
      );
    }

    if (status === 'pending') {
      return (
        <div className={s.App}>
          <Searchbar onSubmit={this.formSubmitHandler} />
          <ImageGallery gallery={gallery} />
          <Button />
          <Loader />
        </div>
      );
    }

    if (status === 'rejected') {
      return (
        <div className={s.App}>
          <Searchbar onSubmit={this.formSubmitHandler} />
          <div className={s.waiting}>
            <p>{error.message}</p>
            <img src={errorImg} alt="error" className={s.image} />
          </div>
        </div>
      );
    }

    if (status === 'resolved') {
      return (
        <div className={s.App}>
          <Searchbar onSubmit={this.formSubmitHandler} />
          <ImageGallery gallery={gallery} />
          <Button onClick={this.loadMoreHandler} />
        </div>
      );
    }
  }
}

export default App;

import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectFetchSerialsLoading, selectSerials} from '../../store/serialSlice';
import React, {useEffect, useState} from 'react';
import {fetchSerials} from '../../store/serialThunks';
import {NavLink} from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const SerialForm = () => {
  const [showTitle, setShowTitle] = useState('');
  const dispatch = useAppDispatch();
  const serials = useAppSelector(selectSerials);
  const fetchLoading  = useAppSelector(selectFetchSerialsLoading);

  useEffect(() => {
    dispatch(fetchSerials(showTitle));
  }, [dispatch, showTitle]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowTitle(e.target.value);
  };

  let listArea = <Spinner/>;

  if (!fetchLoading) {
    listArea = (
      <ul className="list-group mt-1 position-absolute col-8">
        {serials.map(item => (
          <li key={item.show.id} className="list-group-item list-group-item-action">
            <NavLink to={'/shows/' + item.show.id} onClick={() => setShowTitle(item.show.name)}>{item.show.name}</NavLink>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="col-8 m-auto">
      <form className="row">
        <div className="mt-3 row position-relative">
          <label htmlFor="showTitle" className="col-3 col-form-label">Search for TV Show</label>
          <div className="col-9">
            <input
              type="text"
              className="form-control"
              id="showTitle"
              value={showTitle}
              onChange={onChange}
              required
            />
            {listArea}
          </div>
        </div>
      </form>
    </div>

  );
};

export default SerialForm;
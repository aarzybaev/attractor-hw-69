import {useNavigate, useParams} from 'react-router-dom';
import {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectFetchOneLoading, selectOneSerial} from '../../store/serialSlice';
import {fetchOne} from '../../store/serialThunks';
import Spinner from '../../components/Spinner/Spinner';

const Show = () => {
  const dispatch = useAppDispatch();
  const fetchLoading = useAppSelector(selectFetchOneLoading);
  const oneSerial = useAppSelector(selectOneSerial);
  const {id} = useParams();
  const navigate = useNavigate();

  const fetchOneSerial = useCallback(async () => {
    try {
      await dispatch(fetchOne(id || '')).unwrap();
    } catch (e) {
      navigate("/");
    }
  }, [dispatch, id, navigate]);
  useEffect(() => {
    void fetchOneSerial();
  }, [fetchOneSerial]);

  let detailedArea = <Spinner/>;

  if (!fetchLoading && oneSerial) {
    detailedArea = (
      <div className="col-5 m-auto mt-5 d-flex gap-3">
        <div>
          <img src={oneSerial.image.medium} className="card-img-top" style={{width: '150px'}} alt="img"/>
        </div>
        <div className="card-body">
          <h5 className="card-title">{oneSerial.name}</h5>
          <div dangerouslySetInnerHTML={{__html: oneSerial.summary}}/>
        </div>
      </div>
    );
  }

  return detailedArea;
};

export default Show;
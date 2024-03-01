import {useNavigate, useParams} from 'react-router-dom';
import {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectFetchOneLoading, selectOneSerial} from '../../store/serialSlice';
import {fetchOne, fetchSerials} from '../../store/serialThunks';
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
      await dispatch(fetchSerials(''));
    } catch (e) {
      navigate("/notFoundPage");
    }
  }, [dispatch, id, navigate]);
  useEffect(() => {
    void fetchOneSerial();
  }, [fetchOneSerial]);

  let detailedArea = <Spinner/>;
  const noImage = 'data:image/jpeg;base64,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';

  if (!fetchLoading && oneSerial) {
    detailedArea = (
      <div className="col-5 m-auto mt-5 d-flex gap-3">
        <div>
          <img src={!oneSerial.image ? noImage : oneSerial.image.medium} className="card-img-top" style={{width: '150px'}} alt="img"/>
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
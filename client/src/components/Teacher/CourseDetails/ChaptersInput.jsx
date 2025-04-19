import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { svgIconDrag, svgIconEdit, svgIconPlus } from '../../../utils/svgIcons';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTeacherCoursePart,
  updateCoursePartsOrderThunk,
} from '../../../redux/slices/teacherCourseSlice';

const ChaptersInput = ({ parts = [], courseId }) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [addBtnClick, setAddBtnClick] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [isValueValid, setIsValueValid] = React.useState(false);
  const [items, setItems] = React.useState([...parts]);

  React.useEffect(() => {
    setItems([...parts]);
  }, [parts]);

  const handleInput = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsValueValid(newValue.trim().length > 0 && newValue.trim().length <= 255);
  };

  const handleCreatePart = async () => {
    await dispatch(addTeacherCoursePart({ token, courseId, title: inputValue.trim() }))
      .then(() => {
        setInputValue('');
        setAddBtnClick(false);
      })
      .catch((error) => {
        console.error('Ошибка при обновлении курса:', error);
      });
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = Array.from(items);
    const [movedItem] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, movedItem);

    const updatedParts = reordered.map((item, index) => ({
      ...item,
      order: index + 1,
    }));

    console.log('Updated Parts:', updatedParts);

    setItems(updatedParts);

    try {
      await dispatch(updateCoursePartsOrderThunk({ token, courseId, updatedParts }));
    } catch (err) {
      console.error('Ошибка при обновлении порядка:', err);
    }
  };

  return (
    <div className="course-details-inputs-input chapter-block">
      <div className="header">
        <p>Chapters</p>
        <button onClick={() => setAddBtnClick((prev) => !prev)}>
          {!addBtnClick && svgIconPlus()}
          <span>{addBtnClick ? 'Cancel' : 'Add'}</span>
        </button>
      </div>

      {!addBtnClick && (
        <>
          {parts.length === 0 ? (
            <span className="empty-input">No chapters</span>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="chapters">
                {(provided) => (
                  <div
                    className="chapters-order"
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {items
                      .slice()
                      .sort((a, b) => a.order - b.order)
                      .map((part, index) => (
                        <Draggable key={part.id} draggableId={String(part.id)} index={index}>
                          {(provided, snapshot) => (
                            <div
                              className={`chapter-info ${snapshot.isDragging ? 'dragging' : ''}`}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              <div className="chapter-svg">{svgIconDrag()}</div>
                              <p>{part.title}</p>
                              <div className="chapter-controll">
                                <span>{part.status}</span>
                                <div
                                  onClick={() =>
                                    navigator(`/teacher-mode/course/${courseId}/${part.id}`)
                                  }>
                                  {svgIconEdit()}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}

          <span className="ps">Drag and drop to reorder the chapters</span>
        </>
      )}
      {addBtnClick && (
        <>
          <input type="text" value={inputValue} onChange={handleInput} />
          <button disabled={!isValueValid} className="save-btn" onClick={handleCreatePart}>
            Create
          </button>
        </>
      )}
    </div>
  );
};

export default ChaptersInput;

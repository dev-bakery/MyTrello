
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { ITodo, toDoState } from '../atoms';
import DragabbleCard from './DragabbleCard';
import { useSetRecoilState } from 'recoil';
import { useForm } from 'react-hook-form';

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

export interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

const Wrapper = styled.div`
  width:300px;
  height:300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  & + &{
    margin-left:15px
  }
`;
const Area = styled.div<IAreaProps>`
min-height:200px;
  background-color: ${(props) => props.isDraggingOver ? "#dfe6e9" : props.isDraggingFromThis ? "#b2bec3" : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 10px;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  line-height:30px;
`;
const BoardBox = styled.div`
  overflow-y: auto;
  max-height:600px;
`;

interface IForm {
  toDo: string
}

const BoxFormWrap = styled.div`
    padding:0 10px;
    margin:10px 0;
    background-color: #dfe6e9;
`;
const FormContent = styled.form`
    display: flex;
`;
const FormInput = styled.input`
    flex:1;
    font-size:14px;
    padding:5px;
`;
const Button = styled.button`
    margin-left:5px;
    font-size:14px;
`;

function Board({ toDos, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    }
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [newToDo, ...allBoards[boardId]],
      };
    });
    setValue("toDo", "")
  }
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <BoxFormWrap>
        <FormContent onSubmit={handleSubmit(onValid)}>
          <FormInput {...register('toDo', { required: "Please Write a to do" })} type="text" placeholder='Write a to do' />
          <Button>Add</Button>
        </FormContent>
      </BoxFormWrap>
      <BoardBox>
        <Droppable droppableId={boardId}>
          {(magic, info) => (
            <Area isDraggingOver={info.isDraggingOver} isDraggingFromThis={Boolean(info.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
              {toDos.map((toDo, index) => (
                <DragabbleCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
              ))}
              {magic.placeholder}
            </Area>
          )}
        </Droppable>
      </BoardBox>
    </Wrapper>
  )
}

export default Board;
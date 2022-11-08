import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { toDoState } from '../atoms';

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) => props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
  const [toDos, setToDos] = useRecoilState(toDoState);
  console.log(toDos)
  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(magic, snapshot, info) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
          <button type='button' onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            const { source } = info;
            setToDos((allBoards) => {
              const soouceBoard = [...allBoards[source.droppableId]];
              soouceBoard.splice(source.index, 1);
              return {
                ...allBoards,
                [source.droppableId]: soouceBoard,
              };
            })
          }}>삭제</button>
        </Card>
      )}
    </Draggable>
  )
}

export default React.memo(DragabbleCard);
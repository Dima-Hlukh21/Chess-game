import React from 'react';









function Cell({width, height, position, children}) {
  const offsetX = position.x * width;
  const offsetY = position.y * height;

  const isBlack = position.x % 2 === position.y % 2;

  return <div style={{
    position: 'absolute',
    width: width + 'px',
    height: height + 'px',
    transform: `translate(${offsetX}px, ${offsetY}px)`,
    backgroundColor: isBlack? 'lightgray': 'lightyellow'
  }}>{children}</div>
}

function CreateBord() {
  const width = 600;
  const height = 600;

  const numberOfRows = 8;
  const numberOfColumns = 8;

  const cellWidth = width / numberOfColumns;
  const cellHeight = height / numberOfRows;

  const board = [
    2,3,4,5,6,4,3,2,
    1,1,1,1,1,1,1,1,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,
    -1,-1,-1,-1,-1,-1,-1,-1,
    -2,-3,-4,-5,-6,-4,-3,-2
  ];
  
  return (
    <div
      className="board"
      style={{
        width: width + 'px',
        height: height + 'px',
      }}>
      {board.map((v,i) => {
        const position = {
          x: i % numberOfColumns,
          y: (i - (i % numberOfColumns)) / numberOfColumns,
        };

        return <Cell 
          width={cellWidth}
          height={cellHeight}
          position={position}
          >{}</Cell>
      })}
    </div>
  );
}

export default CreateBord;
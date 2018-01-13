import {getCoords, getNodeFromMarkup} from './helpers';

export default () => {
  const diagramBody = document.querySelector('.diagram__body');
  const diagramBodyCnt = document.querySelector('.diagram__body-cnt');

  if (diagramBody === null) {
    return;
  }
  const diagramRoomArr = diagramBodyCnt.querySelectorAll('.diagram__room');

  for (let diagramRoom of Array.from(diagramRoomArr)) {
    const diagramRoomName = diagramRoom.querySelector('.diagram__room-name');
    const roomNameTag = `<div class="room-name-tag">${diagramRoomName.innerHTML}</div>`;
    const roomNameTagNode = getNodeFromMarkup(roomNameTag);
    if (diagramRoom.classList.contains('diagram__room--filled')) {
      roomNameTagNode.classList.add('filled');
    }
    diagramRoom.appendChild(roomNameTagNode);
  }

  diagramBody.addEventListener('scroll', () => {
    const elCoordsLeft = -1 * getCoords(diagramBodyCnt).left;
    const roomNameTagArr = document.querySelectorAll('.room-name-tag');
    const diagramRowBody = document.querySelector('.diagram__row-body');
    const diagramRowBodyLeftCoords = getCoords(diagramRowBody).left;

    if (elCoordsLeft > 180) {
      for (let roomNameTag of Array.from(roomNameTagArr)) {
        roomNameTag.classList.add('taged');
        roomNameTag.style.transform = `translateX(${-1 * diagramRowBodyLeftCoords + 180}px)`;
      }
    } else {
      for (let roomNameTag of Array.from(roomNameTagArr)) {
        roomNameTag.classList.remove('taged');
      }
    }
  });
};

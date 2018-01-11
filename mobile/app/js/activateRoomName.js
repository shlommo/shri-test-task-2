import {getCoords, getNodeFromMarkup} from './helpers';

export default () => {
  const diagramBody = document.querySelector('.diagram__body');
  const diagramBodyCnt = document.querySelector('.diagram__body-cnt');
  const body = document.querySelector('body');

  if (diagramBody === null) {
    return;
  }
  const diagramRoomArr = diagramBodyCnt.querySelectorAll('.diagram__room');

  for (let diagramRoom of diagramRoomArr) {
    const diagramRoomName = diagramRoom.querySelector('.diagram__room-name');
    const roomNameTag = `<div class="room-name-tag">${diagramRoomName.innerHTML}</div>`;
    const roomNameTagNode = getNodeFromMarkup(roomNameTag);
    const diagramRoomTopCoords = getCoords(diagramRoom).top;
    if (diagramRoom.classList.contains('diagram__room--filled')) {
      roomNameTagNode.classList.add('filled');
    }
    roomNameTagNode.style.top = `${diagramRoomTopCoords}px`;
    body.appendChild(roomNameTagNode);
  }

  diagramBody.addEventListener('scroll', () => {
    const elCoordsLeft = -1 * getCoords(diagramBodyCnt).left;
    const roomNameTagArr = document.querySelectorAll('.room-name-tag');

    if (elCoordsLeft > 180) {
      for (let roomNameTag of roomNameTagArr) {
        roomNameTag.classList.add('taged');
      }
    } else {
      for (let roomNameTag of roomNameTagArr) {
        roomNameTag.classList.remove('taged');
      }
    }
  });
};

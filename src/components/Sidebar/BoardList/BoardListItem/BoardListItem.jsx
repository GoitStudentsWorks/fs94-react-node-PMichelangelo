import { NavLink } from 'react-router-dom';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import BtnList from 'shared/components/BtnList';
import Modal from 'components/Modal/Modal';
import NewDashboardModal from 'components/Modal/NewDashboardModal/NewDashboardModal';

import {
  deleteDashboard,
  editDashboard,
} from '../../../../redux/dashboards/dashboards-operations';

import sprite from '../../../../images/icons.svg';

import css from './BoardListItem.module.css';

import { useSelector } from 'react-redux';
import { selectTheme } from '../../../../redux/auth/auth-selectors';
import createStyle from 'shared/functions/style';

const BoardListItem = ({ board, isActive, onClick }) => {
  const theme = useSelector(selectTheme);

  const dispatch = useDispatch();
  const [modalActive, setModalActive] = useState(false);

  const spriteArr = ['pencil-icon', 'trash-icon'];
  const idArr = [`editBoard${board._id}`, `deleteBoard${board._id}`];

  const onSubmit = body => {
    const boardId = board._id;
    dispatch(editDashboard({ boardId, body }));
  };

  const handleClick = e => {
    e.stopPropagation();
    e.preventDefault();
    if (e.currentTarget.id === idArr[0]) {
      setModalActive(true);
    } else {
      dispatch(deleteDashboard(board._id));
    }
  };

  return (
    <li className={css.listItem} onClick={onClick}>
      <NavLink
        to={`/home/${board.title}`}
        className={`${css.boardLink} ${css[createStyle(theme, 'boardLink')]}`}
      >
        <span className={css.boardLinkWrap}>
          <svg className={`${css.icon} ${css[createStyle(theme, 'icon')]}`}>
            <use href={`${sprite}#${board.icon}`} />
          </svg>
          {board.title}
        </span>
        {isActive && (
          <BtnList
            theme={theme}
            spriteArr={spriteArr}
            idArr={idArr}
            handleClick={handleClick}
          />
        )}
      </NavLink>
      {isActive && (
        <Modal
          isOpen={modalActive}
          onClose={setModalActive}
          title={'Edit board'}
        >
          <NewDashboardModal
            onClose={setModalActive}
            onSubmit={onSubmit}
            initialBoardState={board}
            btnText={'Edit'}
          />
        </Modal>
      )}
    </li>
  );
};
export default BoardListItem;

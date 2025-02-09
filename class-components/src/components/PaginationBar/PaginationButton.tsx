import { useSearchParams } from 'react-router-dom';

interface IButton {
  btnText?: string;
  btnClass?: string;
  direction: string;
}

export default function PaginationButton(props: IButton) {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearchParams = () => {
    if (searchParams.get('page')) {
      const newSearchParams = new URLSearchParams(searchParams);
      const curPage = +searchParams.get('page')!;
      newSearchParams.set(
        'page',
        (props.direction === 'Next' ? curPage + 1 : curPage - 1).toString()
      );
      if (newSearchParams.get('page') === '0') newSearchParams.set('page', '1');
      setSearchParams(newSearchParams);
    }
    if (!searchParams.get('page') && props.direction === 'Next') {
      const newSearchParams = new URLSearchParams(searchParams);
      const curPage = '2';
      newSearchParams.set('page', curPage);
      setSearchParams(newSearchParams);
    }
  };

  return (
    <div
      className={props.btnClass + ' pagination-bar-btn'}
      onClick={updateSearchParams}
    >
      {props.btnText}
    </div>
  );
}

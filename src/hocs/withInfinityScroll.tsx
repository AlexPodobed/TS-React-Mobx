import { debounce } from 'lodash';
import * as React from 'react';

export interface IWithInfinityScrollProps {
  loading: boolean;
  size: number;
  total: number;
  onLazyLoad: () => void;
}

export const witInfinityScroll = <P extends object>(Component: React.ComponentType<P>) => {
  return class WitInfinityScroll extends React.Component<P & IWithInfinityScrollProps> {
    private readonly scrollWithDelay: () => void;
    private readonly SCROLL_DELAY = 200;

    constructor(props: P & IWithInfinityScrollProps) {
      super(props);

      this.scrollWithDelay = debounce(this.onScroll, this.SCROLL_DELAY);
    }

    public componentDidMount() {
      window.addEventListener('scroll', this.scrollWithDelay);
    }

    public componentWillUnmount() {
      window.removeEventListener('scroll', this.scrollWithDelay);
    }

    public onScroll = () => {
      const { size, total, loading, onLazyLoad } = this.props;
      const isBottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
      const canLoad = !loading && total > size;

      if (isBottom && canLoad) {
        onLazyLoad();
      }
    };

    public render() {
      return <Component {...this.props}/>;
    }
  };
};
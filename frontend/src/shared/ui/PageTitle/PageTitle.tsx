import {Text} from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import {ReactNode} from 'react';

const b = block('upload-page');

import './PageTitle.scss';

interface Props {
    title: ReactNode;
    leftContent?: ReactNode;
    rightContent?: ReactNode;
}

export const PageTitle = ({title, leftContent, rightContent}: Props) => {
    return (
        <div className={b('header_wrapper')}>
            {leftContent}
            <Text className={b('header')} variant="header-1" as="h1">
                {title}
            </Text>
            {rightContent}
        </div>
    );
};

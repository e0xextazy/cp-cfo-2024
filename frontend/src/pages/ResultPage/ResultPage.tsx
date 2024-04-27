import block from 'bem-cn-lite';
import {ArrowLeft} from '@gravity-ui/icons';
import {Button, Icon, Label, Link, Table, TableColumnConfig, Text} from '@gravity-ui/uikit';

import {useAppState} from '@/store';

import {CourseInfo} from '@/types';

import './ResultPage.scss';

const b = block('result-page');

const columms: TableColumnConfig<CourseInfo>[] = [
    {
        id: 'title',
        name: 'Название курса',
        width: 200,
        sticky: 'left',
        template: (item) => {
            return (
                <Link href={item.url} visitable>
                    <Text variant="subheader-1">{item.title}</Text>
                </Link>
            );
        },
    },
    {
        id: 'description',
        name: 'Описание',
        width: 500,
    },
    {
        id: 'technologies',
        name: 'Стек',
        width: 300,
        template: (item) => {
            return (
                <div className={b('technologies')}>
                    {item.technologies.map((skill, idx) => (
                        <Label
                            interactive
                            theme={'info'}
                            className={b('technologies__item')}
                            key={idx}
                        >
                            {skill}
                        </Label>
                    ))}
                </div>
            );
        },
    },
    {
        id: 'price',
        name: 'Цена',
        template: (item) => {
            return <Text variant="subheader-1">{item.price} ₽</Text>;
        },
    },
];

export const ResultPage = () => {
    const {result, resetResult} = useAppState();

    return (
        <div className={b()}>
            <div className={b('header')}>
                <Text variant="header-1">Список курсов</Text>
                <Button view="outlined" onClick={resetResult}>
                    <Icon data={ArrowLeft} size={12} />
                    Обратно к форме
                </Button>
            </div>
            <div className={b('content')}>
                <Table wordWrap columns={columms} data={result?.result || []} />
            </div>
        </div>
    );
};

import block from 'bem-cn-lite';
import {ArrowLeft} from '@gravity-ui/icons';
import {
    Button,
    Icon,
    Label,
    Link,
    Table,
    TableColumnConfig,
    Text,
    Progress,
    Pagination,
} from '@gravity-ui/uikit';

import {useAppState} from '@/store';
import {CourseInfo} from '@/types';
import {PageTitle} from '@/shared/ui';

import './ResultPage.scss';
import {useState} from 'react';

const columms: TableColumnConfig<CourseInfo>[] = [
    {
        id: 'title',
        name: 'Название курса',
        width: 200,
        sticky: 'left',
        template: (item) => {
            return (
                <Link href={item.url}>
                    <Text variant="subheader-1">{item.title}</Text>
                </Link>
            );
        },
    },
    {
        id: 'description',
        name: 'Описание',
        width: 350,
    },
    {
        id: 'technologies',
        name: 'Покрываемые навыки',
        template: (item) => {
            return (
                <div className={b('technologies')}>
                    {item.technologies.map((skill, idx) => (
                        <Label
                            interactive
                            theme="success"
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
        width: 80,
        template: (item) => {
            return <Text variant="body-1">{item.price} ₽</Text>;
        },
    },
    {
        id: 'match',
        name: 'Совпадение',
        sticky: 'left',
        template: (item) => {
            return (
                <Progress
                    key={item.title}
                    text={`${item.match * 100}%`}
                    theme="success"
                    size="m"
                    value={item.match * 100}
                />
            );
        },
    },
    {
        id: 'months',
        name: 'Продолжительность',
        align: 'center',
        template: (item) => {
            const text = item.months !== undefined ? `${item.months} мес.` : 'Нет информации';

            return <Text variant="body-1">{text}</Text>;
        },
    },
];

const b = block('result-page');

const ITEMS_PER_PAGE = 8;

export const ResultPage = () => {
    const {result, resetResult} = useAppState();
    const [page, setPage] = useState(1);

    const currentResult = result?.result.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <div className={b()}>
            <PageTitle
                title={`Найдено ${result?.count} курсов`}
                rightContent={
                    <Button className={b('back')} view="outlined" onClick={resetResult}>
                        <Icon data={ArrowLeft} size={12} />
                        Обратно к форме
                    </Button>
                }
            />
            <div className={b('content')}>
                <Table wordWrap columns={columms} data={currentResult || []} />
            </div>
            <div className={b('footer')}>
                <Pagination
                    compact
                    total={result?.count}
                    onUpdate={setPage}
                    page={page}
                    pageSize={8}
                />
            </div>
        </div>
    );
};

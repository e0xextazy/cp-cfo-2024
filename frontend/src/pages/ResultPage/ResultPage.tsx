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
import {CourseInfo, Result} from '@/types';
import {PageTitle} from '@/shared/ui';

import './ResultPage.scss';
import {useState} from 'react';

const getColumns = (): TableColumnConfig<CourseInfo>[] => [
    {
        id: 'title',
        name: 'Название курса',
        width: 200,
        sticky: 'left',
        template: (item) => {
            return (
                <Link href={item.link}>
                    <Text variant="subheader-1">{item.title}</Text>
                </Link>
            );
        },
    },
    {
        id: 'desc',
        name: 'Описание',
        width: 350,
    },
    {
        id: 'vac_stack',
        name: 'Покрываемые навыки',
        template: (item) => {
            const vacSkills = item.vac_stack || [];
            const courseSkills = item.cover || [];

            return (
                <div className={b('vac_stack')}>
                    {courseSkills.map((skill, idx) => (
                        <Label
                            interactive
                            theme={vacSkills.includes(skill) ? 'success' : 'normal'}
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
        id: 'duration',
        name: 'Продолжительность',
        align: 'center',
        template: (item) => {
            const text = item.duration !== undefined ? `${item.duration} мес.` : 'Нет информации';

            return <Text variant="body-1">{text}</Text>;
        },
    },
    {
        id: 'price',
        name: 'Стоимость',
        width: 80,
        template: (item) => {
            return <Text variant="body-1">{item.price * 36} ₽</Text>;
        },
    },
];

const b = block('result-page');

const ITEMS_PER_PAGE = 8;

export const ResultPage = () => {
    const {result, resetResult} = useAppState();
    const [page, setPage] = useState(1);

    const currentResult: CourseInfo[] =
        result?.result.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE) || [];

    const count = result?.result.length || 0;

    const vacSkills = currentResult[0].vac_stack;

    return (
        <div className={b()}>
            <div className={b('header')}>
                <PageTitle
                    title={`Найдено ${count} курсов`}
                    rightContent={
                        <Button className={b('back')} view="outlined" onClick={resetResult}>
                            <Icon data={ArrowLeft} size={12} />
                            Обратно к форме
                        </Button>
                    }
                />
                <div className={b('skills')}>
                    <Text variant="body-2">Распознанные навыки:</Text>
                    {vacSkills.map((skill) => (
                        <Label interactive theme="info">
                            {skill}
                        </Label>
                    ))}
                </div>
            </div>
            <div className={b('content')}>
                <Table wordWrap columns={getColumns()} data={currentResult || []} />
            </div>
            <div className={b('footer')}>
                <Pagination compact total={count} onUpdate={setPage} page={page} pageSize={8} />
            </div>
        </div>
    );
};

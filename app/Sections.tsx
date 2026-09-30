'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ASSETS } from '@/lib/assets';
import { usePinnedSteps } from './motion';
const A = ASSETS;
export function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      →
    </span>
  );
}
function CTA({
  children = 'Обсудить ваш проект',
  className = 'primary',
  href = '#contact',
}: {
  children?: ReactNode;
  className?: string;
  href?: string;
}) {
  return (
    <a
      className={className}
      href={href}
      target={href.startsWith('https://') ? '_blank' : undefined}
      rel={href.startsWith('https://') ? 'noopener noreferrer' : undefined}
    >
      {children}
      <Arrow />
    </a>
  );
}
function Heading({
  tag,
  line1,
  line2,
  first = false,
  description,
}: {
  tag: string;
  line1: string;
  line2: string;
  first?: boolean;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <span className="tag">{tag}</span>
      <div>
        <h2>
          <span className={first ? 'gradient' : ''}>{line1}</span>
          <br />
          <span className={'heading-indent ' + (!first ? 'gradient' : '')}>
            {line2}
          </span>
        </h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}
const news = [
  {
    tag: 'Мероприятия',
    date: '21 августа 2026',
    title:
      'Билингво на Ростках и Русском поле',
  },
  {
    tag: 'Мероприятия',
    date: '18 августа 2026',
    title:
      'Обучение работе с ИИ на чемпионате по пахоте',
  },
  {
    tag: 'Мероприятия',
    date: '17 августа 2026',
    title: 'Демо-день ИЦК "Сельское хозяйство"',
  },
];
function News() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section id="news" className="news-section rounded-section">
      <div className="wrap">
        <Heading tag="Актуальное" line1="Новости" line2="и события" first />
        <div className="news-links">
          <a href="#news-list">
            Все новости <Arrow />
          </a>
        </div>
        <div id="news-list" className="news-grid">
          {news.map((n, i) => (
            <article className="news-card" key={n.title}>
              <button
                className="news-image-button"
                onClick={() => setSelected(i)}
                aria-label={n.title}
              >
                <img src={A + `news-${i + 1}.webp`} alt="" />
              </button>
              <div className="news-body">
                <div className="news-meta">
                  <span>#{n.tag}</span>
                  <time>{n.date}</time>
                </div>
                <h3>{n.title}</h3>
                <button className="text-link" onClick={() => setSelected(i)}>
                  Подробнее <Arrow />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="news-dialog">
          {selected !== null && (
            <>
              <img src={A + `news-${selected + 1}.webp`} alt="" />
              <DialogTitle>{news[selected].title}</DialogTitle>
              <DialogDescription>
                {news[selected].date} · {news[selected].tag}
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
const audiences = [
  {
    title: 'Органы управления и отраслевые организации',
    tabTitle: 'Органы управления и отраслевые союзы',
    description:
      'Для ведомств, отраслевых союзов и операторов информационных систем. Создаем реестры и кабинеты, чтобы собирать сведения по единым правилам и отслеживать заявки от подачи до решения.',
    signals: [
      'Сбор и проверка отраслевых данных',
      'Кабинеты, услуги и отчетность',
      'Обмен с государственными системами',
    ],
  },
  {
    title: 'Агрохолдинги и сельхозпредприятия',
    tabTitle: 'Агрохолдинги и сельхозпредприятия',
    description:
      'Для растениеводческих и животноводческих хозяйств, агрохолдингов. Помогаем сопоставлять план работ, расход ресурсов и результат по полям, фермам и площадкам. Для этого связываем отраслевое ПО и учетные системы.',
    signals: [
      'Работы, техника и производственные ресурсы',
      'План и факт по подразделениям',
      'Данные производства и управленческий учет',
    ],
  },
  {
    title: 'Перерабатывающие предприятия',
    tabTitle: 'Перерабатывающие предприятия',
    description:
      'Для предприятий, принимающих и перерабатывающих сельхозсырье. Связываем приемку, лабораторию, производство и склад, чтобы прослеживать партию и сопоставлять расход сырья с выходом готовой продукции.',
    signals: [
      'Качество и происхождение сырья',
      'План выпуска, расход сырья и отклонения',
      'Партии и документы от приемки до отгрузки',
    ],
  },
  {
    title: 'Научные и образовательные организации',
    tabTitle: 'Научные и образовательные организации',
    description:
      'Для НИИ, селекционных центров, вузов и колледжей. Разрабатываем системы учета исследовательских данных и расчетов, обучаем работе с отраслевыми ГИС и ИИ. Билингво помогает проводить занятия для многоязычной аудитории.',
    signals: [
      'Исследовательские и селекционные данные',
      'Учебные тренажеры отраслевых систем',
      'Перевод речи и учебных материалов',
    ],
  },
];
function Audiences() {
  const { root, stage, active, choose, direction } = usePinnedSteps(4);
  return (
    <section
      id="audiences"
      className="audience-scroll"
      ref={root}
      data-active-step={active}
      data-direction={direction}
    >
      <div ref={stage} className="audience-stage">
        <div className="wrap">
          <Heading
            tag="Для кого мы работаем"
            line1="Цифровые решения для"
            line2="всей отрасли АПК"
            first
            description="Помогаем участникам агропромышленного комплекса выбирать, внедрять и развивать цифровые решения с учетом их процессов и действующих систем."
          />
          <div className="audience-layout">
            <div
              className="audience-tabs"
              role="tablist"
              aria-label="Аудитории"
              aria-orientation="vertical"
            >
              {audiences.map((a, i) => (
                <button
                  role="tab"
                  aria-selected={active === i}
                  aria-controls={'audience-panel-' + i}
                  id={'audience-tab-' + i}
                  className={active === i ? 'active' : ''}
                  onClick={() => choose(i)}
                  key={a.title}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                      e.preventDefault();
                      const n = (i + (e.key === 'ArrowDown' ? 1 : 3)) % 4;
                      choose(n);
                      document.getElementById('audience-tab-' + n)?.focus();
                    }
                  }}
                >
                  <img
                    src={
                      A +
                      (i === 0
                        ? 'audience-icon-0.webp'
                        : `audience-icon-${i}.png`)
                    }
                    alt=""
                  />
                  <span>{a.tabTitle}</span>
                </button>
              ))}
            </div>
            <div className="audience-panels">
              {audiences.map((a, i) => (
                <article
                  className={'audience-panel ' + (active === i ? 'active' : '')}
                  role="tabpanel"
                  id={'audience-panel-' + i}
                  aria-labelledby={'audience-tab-' + i}
                  aria-hidden={active !== i}
                  inert={active !== i}
                  key={a.title}
                >
                  <div className="audience-copy">
                    <h3>{a.title}</h3>
                    <p>{a.description}</p>
                    <ul className="audience-signals">
                      {a.signals.map((signal) => (
                        <li key={signal}>{signal}</li>
                      ))}
                    </ul>
                    <CTA>Обсудить задачу</CTA>
                  </div>
                  <img
                    className="audience-visual"
                    src={A + `audience-${i}.webp`}
                    alt={a.title}
                  />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
const engineering = [
  {
    title: 'Высоконагруженные системы',
    description:
      'Проектируем распределение нагрузки, резервирование и мониторинг. Задаем показатели отклика и восстановления, которые проверяются при приемке.',
    tags: ['Архитектура', 'Производительность', 'Надежность'],
  },
  {
    title: 'Отраслевые платформы',
    description:
      'Разрабатываем отраслевые платформы, включая ЕЦП АПК. Проектируем реестры и кабинеты с едиными справочниками, проверкой данных и разграничением полномочий.',
    tags: ['Реестры', 'Личные кабинеты', 'Аналитика'],
  },
  {
    title: 'ГИС и пространственные данные',
    description:
      'Связываем карты, реестры и данные наблюдений. Учитываем границы участков и историю изменений, чтобы сопоставлять сведения о территории с производственным и отраслевым учетом.',
    tags: ['Карты', 'Геосервисы', 'Мониторинг'],
  },
];
function Engineering() {
  return (
    <section id="engineering" className="engineering wrap">
      <Heading
        tag="Инженерная база"
        line1="Разрабатываем отраслевые"
        line2="информационные системы"
        description="Проектируем отраслевые платформы и ГИС, связываем системы и сопровождаем их работу."
      />
      <div className="engineering-grid">
        {engineering.map((e, i) => (
          <article key={e.title} className="engineering-card">
            <div className="engineering-title">
              <img src={A + `engineering-icon-${i}.png`} alt="" />
              <h3>{e.title}</h3>
            </div>
            <p>{e.description}</p>
            <div className="engineering-image">
              <img src={A + `engineering-${i}.webp`} alt="" />
              <div className="pills">
                {e.tags.map((t) => (
                  <span key={t}>
                    <i />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
const productNames = [
  'Платформы и ГИС',
  'ИИ-решения',
  'АгроПорт',
  'Билингво',
  'FMS',
  'Кибербезопасность',
  'Обучение',
];
const productDescriptions = [
  'Разрабатываем отраслевые платформы и геоинформационные системы: реестры, кабинеты, карты и аналитику. Соединяем их с учетными и ведомственными системами, задаем права доступа и проверку сведений.',
  'Внедряем искусственный интеллект в работу с документами, обращениями и производственными данными. Определяем источники сведений, критерии качества и порядок проверки результата специалистом.',
  'Каталог цифровых решений для хозяйств и агробизнеса. Помогает сопоставить задачу предприятия с возможностями ПО, изучить поставщиков и направить запрос по выбранному решению.',
  'Переводит речь преподавателя или спикера, показывает субтитры и подготовленные материалы. Участник открывает сессию по ссылке или QR-коду и выбирает язык на своем устройстве.',
  'Подбираем и внедряем партнерские системы для растениеводства. Связываем поля, технологические карты, задания и данные техники, чтобы видеть выполнение работ и расход ресурсов по каждому полю.',
  'Защищаем информационные системы и инфраструктуру предприятия. Начинаем с аудита активов, прав доступа и угроз, затем проектируем меры защиты, внедряем средства и готовим порядок реагирования.',
  'Обучаем сотрудников применять ИИ, защищать рабочие данные и пользоваться отраслевыми системами. На занятиях слушатели проверяют сведения, готовят документы и отрабатывают сценарии в ГИС.',
];
const productTitles = [
  'Отраслевые платформы и ГИС',
  'Искусственный интеллект для АПК',
  'АгроПорт: каталог решений для агробизнеса',
  'Билингво: синхронный перевод речи',
  'FMS: управление полевыми работами',
  'Информационная безопасность для АПК',
  'Обучение цифровым технологиям для АПК',
];
const productCtas = [
  'Обсудить проект',
  'Обсудить задачу',
  'Открыть каталог',
  'Обсудить Билингво',
  'Подобрать решение',
  'Обсудить защиту систем',
  'Обсудить программу обучения',
];
const productPoints = [
  [929, 145],
  [835, 196],
  [1023, 199],
  [1118, 143],
  [644, 90],
  [1215, 195],
  [834, 88],
];
const productDetails = [
  [
    ['Основа учета', 'Данные и справочники', 'Единые идентификаторы объектов, правила обновления и история изменений. Проверки при вводе и загрузке сведений.'],
    ['Процессы участников', 'Личные кабинеты', 'Подача заявлений, проверка комплектности, согласование и статус рассмотрения. Доступ определяется ролью участника.'],
    ['Геоинформация', 'Карты и наблюдения', 'Связь сведений об объектах с картой: границы участков, наблюдения и анализ территорий.'],
    ['Интеграция систем', 'Обмен с учетом и ГИС', 'Сопоставление справочников, передача сведений, контроль получения и обработка ошибок обмена.'],
  ],
  [
    ['Рабочие материалы', 'Документы и знания', 'Поиск по документам, сравнение условий договоров и подготовка сводок для проверки сотрудником.'],
    ['Клиентский сервис', 'Обращения и заявки', 'Классификация обращений, ответы на типовые вопросы и передача сложного случая сотруднику.'],
    ['Производственная аналитика', 'Прогнозы и отклонения', 'Прогноз спроса и потребности в ресурсах, поиск отклонений в производственных данных. Модель проверяется на истории предприятия.'],
    ['Компьютерное зрение', 'Контроль качества', 'Анализ изображений упаковки, маркировки и продукции. Настройка под виды дефектов и условия съемки.'],
  ],
  [
    ['Задача предприятия', 'Поиск по направлению', 'Решения для производства, учета, аналитики, управления стадом, складом и других задач агробизнеса.'],
    ['Сопоставление вариантов', 'Функции и условия', 'Карточки продуктов и сравнение предложений помогают подготовить предметные вопросы о применении и внедрении.'],
    ['Участники каталога', 'Продукт и поставщик', 'Назначение решения, разработчик и контакт для обращения. Условия поставки и внедрения уточняются по выбранному продукту.'],
    ['Следующий шаг', 'Запрос по решению', 'Обсуждение применимости к своим данным, оборудованию и процессам до выбора состава внедрения.'],
  ],
  [
    ['Во время выступления', 'Перевод речи и субтитры', 'Участник слушает озвученный перевод или читает текст на выбранном языке во время лекции, встречи или конференции.'],
    ['В одной сессии', 'Материалы на языке слушателя', 'Переведенные слайды доступны по ходу выступления. Структура презентации и связь с речью сохраняются.'],
    ['Личное устройство', 'Подключение без приложения', 'Ссылка или QR-код открывают перевод в браузере телефона, планшета или ноутбука. Отдельный приемник не нужен.'],
    ['Подготовка к выступлению', 'Отраслевая терминология', 'Готовим специальные термины, имена и названия по теме выступления. Проверяем перевод материалов и подключение слушателей.'],
  ],
  [
    ['План сезона', 'Поля и технологические карты', 'Культуры, операции, сроки и потребность в ресурсах. Задания на работы связаны с конкретным полем.'],
    ['Исполнение', 'Техника и полевые работы', 'Местоположение техники, треки и обработанная площадь. Сопоставление фактической операции с заданием.'],
    ['Производственные ресурсы', 'ГСМ и материалы', 'Расход топлива, семян, удобрений и средств защиты растений в привязке к работам и полям.'],
    ['Учет и анализ', 'План, факт и интеграции', 'Отклонения по работам и ресурсам. Обмен с 1С и другими системами настраивается под выбранное решение.'],
  ],
  [
    ['Понять состояние', 'Аудит и приоритеты', 'Определяем критичные системы, доступы и уязвимости. Формируем перечень мер с учетом последствий для работы организации.'],
    ['Спроектировать защиту', 'Архитектура и правила', 'Модели угроз, разграничение доступа и защитные меры с учетом назначения систем и требований к данным.'],
    ['Внедрить меры', 'Средства защиты', 'Подбираем, устанавливаем и настраиваем средства защиты в действующей инфраструктуре, готовим документацию.'],
    ['Поддерживать защиту', 'Мониторинг и реагирование', 'Сбор событий безопасности, разбор подозрительных действий и порядок работы команды при инциденте.'],
  ],
  [
    ['Отраслевые системы', 'Практика в ГИС', 'Учебные эмуляторы ФГИС "Зерно", "Семеноводство" и ЕФГИС ЗСН: действия с данными без изменений в рабочих системах.'],
    ['Искусственный интеллект', 'ИИ в рабочих задачах', 'Постановка задачи, работа с документами и данными, проверка ответа и правила обращения с конфиденциальной информацией.'],
    ['Информационная безопасность', 'Действия при угрозах', 'Работа с почтой, учетными записями и файлами, распознавание подозрительных ситуаций и порядок сообщения об инциденте.'],
    ['Программа под роль', 'Сотрудники и руководители', 'Сотрудникам: применение инструментов в работе. Руководителям: выбор решений и организация внедрения. Преподавателям: учебные сценарии.'],
  ],
];
function Products() {
  const {
    root,
    stage,
    active: selected,
    choose: setSelected,
    direction,
  } = usePinnedSteps(7);
  return (
    <section
      id="products"
      className="product-scroll"
      ref={root}
      data-active-step={selected}
      data-direction={direction}
    >
      <div className="product-stage" ref={stage}>
        <div className="products wrap">
          <Heading
            tag="Продукты и услуги"
            line1="Программное обеспечение"
            line2="и услуги для АПК"
          />
          <div className="product-map">
            <div className="product-art" aria-hidden="true">
              {productNames.map((_, i) => (
                <img
                  key={i}
                  src={A + `map-${i}.webp`}
                  className={selected === i ? 'active' : ''}
                  alt=""
                />
              ))}
            </div>
            <div className="map-wash" />
            <div
              className="product-tabs"
              role="tablist"
              aria-label="Направления"
            >
              {productNames.map((n, i) => (
                <button
                  key={n}
                  role="tab"
                  aria-selected={selected === i}
                  aria-controls="product-panel"
                  id={'product-tab-' + i}
                  onClick={() => setSelected(i)}
                  className={selected === i ? 'active' : ''}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                      e.preventDefault();
                      const next = (i + (e.key === 'ArrowRight' ? 1 : 6)) % 7;
                      setSelected(next);
                      document.getElementById('product-tab-' + next)?.focus();
                    }
                  }}
                >
                  <img src={A + `product-icon-${i}.png`} alt="" />
                  {n}
                </button>
              ))}
            </div>
            <div
              className="product-copy long-copy"
              id="product-panel"
              role="tabpanel"
              aria-labelledby={'product-tab-' + selected}
              key={selected}
            >
              <h3>{productTitles[selected]}</h3>
              <p>{productDescriptions[selected]}</p>
              <CTA href={selected === 2 ? 'https://www.agroport-it.ru/marketplace/' : '#contact'}>
                {productCtas[selected]}
              </CTA>
            </div>
            <div className="map-hotspots">
              {productPoints.map(([x, y], i) => (
                <button
                  key={i}
                  className={selected === i ? 'selected' : ''}
                  aria-label={'Показать: ' + productNames[i]}
                  aria-pressed={selected === i}
                  onClick={() => setSelected(i)}
                  style={{
                    left: (x / 1310) * 100 + '%',
                    top: (y / 401) * 100 + '%',
                  }}
                />
              ))}
            </div>
          </div>
          <div className="product-stepper" aria-label="Переход между решениями">
            <span className="step-number">
              0{selected + 1}
              <span> / 07</span>
            </span>
            <div className="step-track" aria-hidden="true">
              {productNames.map((_, i) => (
                <i key={i} className={i === selected ? 'active' : ''} />
              ))}
            </div>
            <button
              onClick={() => setSelected(selected - 1)}
              disabled={selected === 0}
              aria-label="Предыдущее решение"
            >
              ←
            </button>
            <button
              onClick={() => setSelected(selected + 1)}
              disabled={selected === 6}
              aria-label="Следующее решение"
            >
              →
            </button>
          </div>
          <div className="product-details" key={'details-' + selected}>
            {productDetails[selected].map((d, i) => (
              <div key={i}>
                <small>{d[0]}</small>
                <h4>{d[1]}</h4>
                <p>{d[2]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
const devSteps = [
  [
    'Архитектура цифрового продукта',
    'Разбираем рабочий процесс, нагрузку и интеграции, затем согласуем границы системы и критерии приемки.',
  ],
  [
    'Платформенная разработка',
    'Разрабатываем нужные пользователям функции: реестр, кабинет, карту, аналитику или мобильный модуль.',
  ],
  [
    'Данные и интеграции',
    'Настраиваем обмен с 1С, отраслевыми сервисами и реестрами: состав данных, момент передачи, подтверждение получения и обработку ошибок.',
  ],
  [
    'Запуск и развитие',
    'Проверяем пользовательские сценарии, обучаем команду и передаем систему в эксплуатацию с документацией и поддержкой.',
  ],
];
const technologies = [
  ['Разработка', 'Java · PHP · Python · 1С'],
  ['Данные', 'PostgreSQL · MySQL · MariaDB · MongoDB'],
  ['Аналитика', 'Polymatica'],
];
function Development() {
  return (
    <>
      <aside className="checklist wrap">
        <div>
          <span className="tag dark-tag">Практический материал</span>
          <h2>
            <span className="gradient">Что проверить</span>
            <br />
            <span className="heading-indent">до запуска ИТ-проекта</span>
          </h2>
        </div>
        <p>
          Вопросы о данных, интеграциях, безопасности и подготовке сотрудников
          к работе в системе.
        </p>
        <Button
          className="primary checklist-button"
          disabled
          title="Материал пока недоступен"
        >
          Скачать чек-лист <span aria-hidden="true">↓</span>
        </Button>
      </aside>
      <section id="development" className="development wrap">
        <Heading
          tag="Заказная разработка"
          line1="Разработка программного"
          line2="обеспечения для АПК"
          first
          description="Обследуем процесс и действующие системы, согласуем требования и критерии приемки. Разрабатываем недостающие функции, настраиваем интеграции, обучаем пользователей и сопровождаем запуск."
        />
        <CTA className="primary development-cta">
          Обсудить заказную разработку
        </CTA>
        <img
          className="development-image"
          src={A + 'development.webp'}
          alt="Архитектура, платформа, интеграции и запуск"
        />
        <div className="development-steps">
          {devSteps.map(([t, d], i) => (
            <div key={t}>
              <img src={A + `dev-icon-${i}.png`} alt="" />
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <div
          className="technologies"
          aria-label="Технологический стек"
        >
          {technologies.map(([name, tools]) => (
            <div key={name}>
              <span>{name}</span>
              <p>{tools}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
function Radar() {
  const ref = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    fetch(A + 'radar-animated.svg?v=2', { signal: controller.signal })
      .then((r) => r.text())
      .then(setMarkup)
      .catch((e) => {
        if (e.name !== 'AbortError')
          console.error('Radar artwork could not load', e);
      });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el || !markup) return;
    const doc = el;
    doc.querySelectorAll('foreignObject').forEach((node) => node.remove());
    doc.querySelectorAll('[data-figma-bg-blur-radius]').forEach((node) =>
      node.removeAttribute('filter'),
    );
    doc.querySelectorAll('image[data-radar-asset]').forEach((node) => {
      const file = node.getAttribute('data-radar-asset');
      if (file) node.setAttribute('href', A + file);
    });
    const sweep = doc.querySelector('#radar-sweep'),
      glow = doc.querySelector('#radar-glow');
    let frame = 0,
      last = 0,
      elapsed = 0,
      visible = false;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const zoom = Array.from(doc.querySelectorAll('[data-radar-target="zoom"]')),
      cad = Array.from(doc.querySelectorAll('[data-radar-target="cad"]'));
    const logos = {
      zoomForeign: doc.querySelector('[data-radar-logo="zoom-foreign"]'),
      zoomDomestic: doc.querySelector('[data-radar-logo="zoom-domestic"]'),
      cadForeign: doc.querySelector('[data-radar-logo="cad-foreign"]'),
      cadDomestic: doc.querySelector('[data-radar-logo="cad-domestic"]'),
    };
    let previousZoom: boolean | undefined, previousCad: boolean | undefined;
    function draw() {
      const phase = ((elapsed % 14000) / 14000) * 360;
      const angle = phase - 70;
      sweep?.setAttribute('transform', `rotate(${angle} 722.5 446.751)`);
      glow?.setAttribute('transform', `rotate(${angle - 15.28} 722.5 446.751)`);
      const z = (phase >= 85.28 && phase < 285) || reduced,
        c = (phase >= 114.9 && phase < 285) || reduced;
      zoom.forEach((n) => n.setAttribute('fill', z ? '#0FF0AC' : '#FF446F'));
      cad.forEach((n) => n.setAttribute('fill', c ? '#0FF0AC' : '#FF446F'));
      if (z !== previousZoom) {
        logos.zoomForeign?.setAttribute('opacity', z ? '0' : '1');
        logos.zoomDomestic?.setAttribute('opacity', z ? '1' : '0');
        previousZoom = z;
      }
      if (c !== previousCad) {
        logos.cadForeign?.setAttribute('opacity', c ? '0' : '1');
        logos.cadDomestic?.setAttribute('opacity', c ? '1' : '0');
        previousCad = c;
      }
      el?.setAttribute('data-scan-phase', phase.toFixed(1));
      el?.setAttribute('data-zoom-state', z ? 'green' : 'red');
      el?.setAttribute('data-cad-state', c ? 'green' : 'red');
    }
    function tick(now: number) {
      if (!visible) return;
      if (last) elapsed += Math.min(now - last, 80);
      last = now;
      draw();
      frame = requestAnimationFrame(tick);
    }
    draw();
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        last = 0;
        cancelAnimationFrame(frame);
        if (visible && !reduced) frame = requestAnimationFrame(tick);
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [markup]);
  return (
    <section id="independence" className="independence">
      <div
        ref={ref}
        className="radar-art"
        role="img"
        aria-label="Примеры российских альтернатив для видеосвязи и проектирования: Битрикс24 и nanoCAD"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
      <div className="radar-copy wrap">
        <Heading
          tag="Технологическая независимость"
          line1="Переход на российское ПО"
          line2="с проверкой рабочих процессов"
          description="Импортозамещение программного обеспечения начинаем с зависимостей и рабочих сценариев. Подбираем российское ПО, проверяем данные и интеграции на пилоте."
        />
        <div className="radar-steps">
          {[
            [
              'Аудит зависимостей',
              'Определяем зависимости данных и рабочих процессов.',
            ],
            [
              'Целевая архитектура',
              'Выбираем ПО и проектируем связи между системами.',
            ],
            [
              'Пилот и критерии',
              'Проверяем данные и рабочие сценарии на пилоте.',
            ],
            [
              'Перенос и сопровождение',
              'Переносим систему по этапам и сопровождаем работу.',
            ],
          ].map(([t, d]) => (
            <div key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const cases = [
  {
    logo: '26-image-4.png',
    name: 'АгроТерра',
    category: 'Интеграция и данные',
    title: 'Интеграция с ФГИС "Зерно"',
    description:
      'Передача сведений из учетных систем холдинга во ФГИС "Зерно" через интеграционный модуль.',
    point: 'Обмен данными с ФГИС "Зерно"',
    before: 'Учет',
    after: 'Обмен',
    beforeText: 'Ручной ввод сведений о партиях',
    afterText: 'Передача сведений через интеграционный модуль',
  },
  {
    logo: '23-image-2.png',
    name: 'ФНЦ "ВНИТИП"',
    category: 'Платформенное решение',
    title: 'Данные для селекции птицы',
    description:
      'Учет продуктивности и родственных связей птицы, расчет селекционных показателей.',
    point: 'Расчет селекционных показателей',
    before: 'Данные',
    after: 'Расчеты',
    beforeText: 'Ручная подготовка селекционных расчетов',
    afterText: 'Автоматизированный расчет показателей',
  },
  {
    logo: '25-image-3.png',
    name: 'Росагролизинг',
    category: 'Прикладной ИИ',
    title: 'ИИ-ассистент для работы с документами',
    description:
      'Поиск и сравнение сведений в документах, анализ условий и подготовка кратких отчетов.',
    point: 'Поиск и анализ документов',
    before: 'Документы',
    after: 'ИИ',
    beforeText: 'Поиск и сопоставление документов вручную',
    afterText: 'ИИ помогает находить и сравнивать сведения',
  },
];
function Cases() {
  return (
    <section id="projects" className="projects rounded-section">
      <div className="wrap">
        <Heading
          tag="Проекты"
          line1="Задачи и решения"
          line2="в проектах АПЦ"
          description="Задачи заказчиков, состав работ и роль Агропромцифры в проекте."
        />
        <div className="cases-grid">
          {cases.map((c) => (
            <article key={c.name} className="case-card">
              <div className="case-brand">
                <img src={A + c.logo} alt="" />
                <div>
                  <h3>{c.name}</h3>
                  <small>{c.category}</small>
                </div>
              </div>
              <h4>{c.title}</h4>
              <p>{c.description}</p>
              <div className="case-point">
                <i />
                {c.point}
              </div>
              <div className="case-comparison case-comparison-text">
                <div>
                  <span className="metric-label">Задача</span>
                  <strong>{c.before}</strong>
                </div>
                <span className="metric-arrows" aria-hidden="true">
                  ››››››
                </span>
                <div className="metric-after">
                  <span className="metric-label">Решение</span>
                  <strong>{c.after}</strong>
                </div>
              </div>
              <div className="comparison-captions">
                <p>{c.beforeText}</p>
                <p>{c.afterText}</p>
              </div>
              <CTA className="text-link">Обсудить ваш проект</CTA>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Contact() {
  const [status, setStatus] = useState('');
  return (
    <section className="contact-section wrap" id="contact">
      <Heading
        tag="Сотрудничество"
        line1="Обсудим вашу задачу"
        line2="в цифровизации АПК"
        first
        description="Опишите задачу, действующие системы и ограничения проекта. Это поможет подготовить предметное обсуждение."
      />
      <div className="contact-links">
        <a href="tel:+74951203955">
          <span>☎</span> +7 (495) 120-39-55
        </a>
        <a href="mailto:sales@agropromcifra.ru">
          <span>✉</span> sales@agropromcifra.ru
        </a>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setStatus('Это прототип. Заявка не отправлена.');
        }}
      >
        <Input aria-label="Имя" name="name" placeholder="Имя" required />
        <Input
          aria-label="Организация"
          name="company"
          placeholder="Организация"
        />
        <Input
          aria-label="Почта или телефон для связи"
          name="contact"
          placeholder="Почта или телефон для связи"
          required
          minLength={5}
        />
        <Input
          aria-label="Какую задачу хотите решить"
          name="message"
          placeholder="Какую задачу хотите решить"
        />
        <Button type="submit" className="primary">
          Обсудить задачу <Arrow />
        </Button>
        <p className="consent">
          Демонстрационная форма. Заявки не отправляются. Документ политики пока
          не подключен.
        </p>
        <p className="form-status" role="status">
          {status}
        </p>
      </form>
    </section>
  );
}
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <img
              className="footer-logo"
              src={A + 'logo.png'}
              alt="Агропромцифра"
            />
            <p>
              Единый центр компетенций для АПК
            </p>
          </div>
          <div>
            <h4>Продукты и услуги</h4>
            {[
              'Платформы и ГИС',
              'АгроПорт',
              'Билингво',
              'ИИ-решения',
              'Заказная разработка',
            ].map((t, i) => (
              <a key={t} href={i === 4 ? '#development' : '#products'}>
                {t}
              </a>
            ))}
          </div>
          <div>
            <h4>Компания</h4>
            <a href="#audiences">О компании</a>
            <a href="#projects">Проекты</a>
            <a href="#news">Новости и события</a>
            <a href="#partners">Партнеры</a>
          </div>
          <div>
            <h4>Контакты</h4>
            <a href="tel:+74951203955">+7 (495) 120-39-55</a>
            <a href="mailto:sales@agropromcifra.ru">sales@agropromcifra.ru</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 АО "Агропромцифра"</span>
          <span>Политика обработки персональных данных</span>
        </div>
      </div>
    </footer>
  );
}
export default function Sections() {
  return (
    <>
      <News />
      <Audiences />
      <Engineering />
      <Products />
      <Development />
      <Radar />
      <Cases />
      <Contact />
      <Footer />
    </>
  );
}

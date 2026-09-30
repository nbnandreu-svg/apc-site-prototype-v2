'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    tag: 'Отрасль',
    date: '21 августа 2026',
    title: 'Билингво на форумах "Ростки" и "Русское поле"',
    description: 'Сервис переводил выступления на английский и китайский на ключевых сессиях обоих форумов. Участники слушали перевод на своих устройствах, подключившись по QR-коду.',
    href: 'https://agropromcifra.ru/news/razrabotka-agropromtsifry-na-krupneyshikh-agrarnykh-ploshchadkakh-kazani-bilingvo-na-rostkakh-i-russkom-pole',
  },
  {
    tag: 'Мероприятия',
    date: '18 августа 2026',
    title: 'Три дня на чемпионате по пахоте',
    description: '"Уроки АгроЦифры", обучение маркетологов и награждение "Агродилера года". Как прошла программа Агропромцифры на чемпионате и какие задачи разбирали участники.',
    href: 'https://agropromcifra.ru/news/tri-dnya-na-chempionate-po-pakhote-uroki-agrotsifry-obucheniye-marketologov-i-nagrazhdeniye-agrodilera-goda',
  },
  {
    tag: 'Партнерства',
    date: '17 августа 2026',
    title: 'Демо-день ИЦК "Сельское хозяйство"',
    description: 'В программе на 8 сентября: "Молоко 2.0", "Свинофон", "История поля" и другие отраслевые разработки. Презентации проектов и обсуждение цифровых решений для агробизнеса.',
    href: 'https://agropromcifra.ru/news/-priglashayem-na-demo-den-itsk-selskoye-khozyaystvo',
  },
];
function News() {
  return (
    <section id="news" className="news-section rounded-section">
      <div className="wrap">
        <Heading tag="Актуальное" line1="Новости" line2="и события" first />
        <div className="news-links">
          <a href="https://agropromcifra.ru/news" target="_blank" rel="noopener noreferrer">
            Все новости <Arrow />
          </a>
        </div>
        <div id="news-list" className="news-grid">
          {news.map((n, i) => (
            <article className="news-card" key={n.title}>
              <a
                className="news-image-button"
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={n.title}
              >
                <img src={A + `news-${i + 1}.webp`} alt="" />
              </a>
              <div className="news-body">
                <div className="news-meta">
                  <span>#{n.tag}</span>
                  <time>{n.date}</time>
                </div>
                <h3>{n.title}</h3>
                <p className="news-summary">{n.description}</p>
                <a className="text-link" href={n.href} target="_blank" rel="noopener noreferrer">
                  Подробнее <Arrow />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
const audiences = [
  {
    title: 'Отчетность для управления отраслью',
    tabTitle: 'Органы управления и отраслевые союзы',
    description:
      'Разрабатываем ЕЦП АПК с единым входом через ЕСИА и единым листом показателей. Связываем региональные системы с федеральными ФГИС, чтобы ведомство получало сведения от районов в одном окне.',
    proof: { label: 'Республика Татарстан', metric: '2 недели → 2 дня', text: 'Сбор отчетности после модернизации региональной информационной системы.' },
  },
  {
    title: 'Учет хозяйства и обмен с ФГИС',
    tabTitle: 'Агрохолдинги и сельхозпредприятия',
    description:
      'Связываем производственный учет хозяйства с 1С, ФГИС "Зерно", "Сатурн" и "Меркурий". Сведения о продукции и операциях попадают в отчетность из учетной системы, без повторного заполнения вручную.',
    proof: { label: 'АгроТерра · интеграция с ФГИС "Зерно"', metric: '20 часов → 15 минут', text: 'Время работы с отчетностью в неделю после внедрения интеграционного модуля.' },
  },
  {
    title: 'История партии от сырья до отгрузки',
    tabTitle: 'Перерабатывающие предприятия',
    description:
      'Помогаем установить, из какого сырья изготовлена партия, на какой линии и в какую смену. Связываем эти сведения с результатами лаборатории, чтобы разбирать рекламации и находить источник брака.',
    proof: { label: 'Пример решения', metric: 'AI "Паспорт партии"', text: 'Связь готовой продукции с партиями сырья, производственной сменой и контролем качества.' },
  },
  {
    title: 'Селекционные расчеты и практическое обучение',
    tabTitle: 'Научные и образовательные организации',
    description:
      'Автоматизируем селекционные расчеты с учетом продуктивности и происхождения птицы. В вузах обучаем работе с ФГИС на эмуляторах. Билингво переводит лекции и слайды на устройствах студентов.',
    proof: { label: 'ФНЦ ВНИТИП', metric: 'В 10 раз быстрее', text: 'Селекционные расчеты после внедрения платформы управления селекцией птицы.' },
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
            description="Разрабатываем, внедряем и сопровождаем цифровые решения для государственного сектора и коммерческого агробизнеса. От отраслевой отчетности до производства, переработки и подготовки специалистов."
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
                    <div className="audience-proof">
                      <span>{a.proof.label}</span>
                      <strong>{a.proof.metric}</strong>
                      <p>{a.proof.text}</p>
                    </div>
                    <CTA>Обсудить задачу</CTA>
                  </div>
                  <img
                    className="audience-visual"
                    src={A + `audience-${i}.webp`}
                    alt={a.tabTitle}
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
      'Проектируем системы для параллельной работы пользователей и массового обмена данными. Распределяем нагрузку между сервисами, резервируем критичные компоненты и предусматриваем восстановление после сбоев.',
    tags: ['Архитектура', 'Производительность', 'Надежность'],
  },
  {
    title: 'Отраслевые платформы',
    description:
      'Разработчик ЕЦП АПК. Объединяем вход через ЕСИА, отраслевую отчетность и обмен с федеральными системами. Модернизируем региональные ИС, сохраняя связь с действующим учетом.',
    tags: ['Реестры', 'Личные кабинеты', 'Аналитика'],
  },
  {
    title: 'ГИС и пространственные данные',
    description:
      'В пилоте агрометеомониторинга Татарстана подсистема АПЦ собирает, проверяет и анализирует данные метеостанций. Проект реализуется Ростелекомом при поддержке регионального Минсельхоза.',
    tags: ['Карты', 'Геосервисы', 'Мониторинг'],
  },
];
function Engineering() {
  return (
    <section id="engineering" className="engineering wrap">
      <Heading
        tag="Инженерная база"
          line1="Создаем сложные"
          line2="цифровые системы"
          description="Компетенции, на которых строятся отраслевые платформы и проекты цифровой трансформации"
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
  'Разрабатываем системы отраслевой отчетности, управления землей и селекционных расчетов. Среди проектов АПЦ: ЕЦП АПК, региональная система Татарстана и платформа селекции птицы ФНЦ ВНИТИП.',
  'Разрабатываем ИИ-агентов для звонков, заявок и документов. Создаем модели для прогноза спроса и анализа производственных отклонений, решения компьютерного зрения для контроля качества и состояния растений.',
  'Подбирайте ПО под задачу хозяйства и сравнивайте предложения на одной площадке. В АгроПорте можно изучить состав решения и стоимость, пройти цифровой аудит и обратиться за помощью с внедрением.',
  'Перевод речи, субтитров и слайдов в одной сессии для занятий, конференций и встреч. Каждый слушатель выбирает язык на своем устройстве. Билингво работает в облаке или на серверах организации.',
  'Внедряем партнерские платформы AgroSignal и AssistAgro. Задания на работы, треки техники, движение урожая и полевые наблюдения связываются с производственным учетом и 1С.',
  'Защищаем корпоративные и государственные информационные системы. Проверяем, как злоумышленник может получить доступ, внедряем средства защиты, проводим аттестацию и сопровождаем инфраструктуру.',
  'Обучаем работе с отраслевыми ГИС на эмуляторах, применению ИИ в задачах сотрудников и информационной безопасности. Проводим корпоративные курсы и включаем учебные модули в программы аграрных вузов.',
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
    ['ЕЦП АПК', 'Единый вход и отраслевая отчетность', 'Вход через ЕСИА, единый лист показателей и цифровой помощник уже реализованы в платформе, которую разрабатывает АПЦ.'],
    ['Республика Татарстан', 'Сбор отчетности: с двух недель до двух дней', 'Обновили архитектуру региональной ИС, связали ее с федеральными ФГИС и автоматизировали сбор сведений от районов.'],
    ['ФНЦ ВНИТИП', 'Селекционные расчеты в 10 раз быстрее', 'Учет продуктивности и родственных связей птицы. Автоматизированный расчет селекционных показателей вместо недель ручной работы.'],
    ['Государственные системы', 'Развитие ЕФГИС ЗСН', 'АПЦ определена исполнителем работ по развитию системы учета земель, а также систем "Единое окно", племенных ресурсов и научно-технического мониторинга.'],
  ],
  [
    ['Росагролизинг', 'Ассистент для документов и каталога техники', 'Поиск по рабочим материалам, сравнение условий сделок и цен поставщиков. В каталоге заказчика более 30 000 моделей техники.'],
    ['Операционный ИИ', 'Заявки и звонки с записью в CRM', 'Агенты принимают обращения, подтверждают заказы и отвечают по ассортименту. Результаты передаются в CRM и 1С, сложные вопросы сотруднику.'],
    ['Промышленный ИИ · прототип', 'Диагностика растений со СтГАУ', 'Робот фотографирует растения, нейросеть ищет признаки заболеваний. Первые промышленные испытания прошли на площадке "Солнечный дар".'],
    ['Управленческий ИИ', 'Прогноз спроса и план-факт анализ', 'Модели учитывают продажи, сезонность и акции. Прогноз связывается с производственным планом и потребностью в ресурсах, анализ плана и факта показывает отклонения.'],
  ],
  [
    ['Действующий каталог', 'От 1С:ERP АПК до Solvo.WMS', 'Решения для производства, учета стада, ветеринарного контроля и склада. В карточках указаны функции, поставщик и условия приобретения.'],
    ['Цифровой аудит', 'Подбор под задачи хозяйства', 'Анкета учитывает направление и размер хозяйства, действующие программы, задачи автоматизации и бюджет. Эти сведения помогают подобрать решения.'],
    ['Сравнение продуктов', 'Функции и стоимость рядом', 'Добавляйте продукты в список сравнения и сопоставляйте возможности и условия поставки до разговора с поставщиком.'],
    ['Помощь с внедрением', 'От выбора ПО до запуска', 'Эксперты АПЦ помогают выбрать решение и организовать внедрение. На площадке можно описать задачу хозяйства и запросить консультацию.'],
  ],
  [
    ['Опыт применения', 'Более 1000 слушателей', 'Билингво применялся в РГАУ-МСХА, МГИМО и Университете по землеустройству, на форумах "Ростки" и "Русское поле".'],
    ['Для каждого участника', 'Перевод в браузере по QR-коду', 'Слушатель выбирает язык, слышит озвучку и читает субтитры на телефоне или ноутбуке. Установка приложения и отдельный приемник не нужны.'],
    ['Речь и презентация', 'Слайды и термины готовим заранее', 'Переводим материалы с сохранением структуры, добавляем лексику дисциплины, имена и названия. Проверяем перевод и подключение до выступления.'],
    ['Размещение и сопровождение', 'В облаке или на ваших серверах', 'Устанавливаем Билингво у заказчика, при необходимости предоставляем оборудование. Согласуем доступ и хранение данных, сопровождаем систему.'],
  ],
  [
    ['План и факт', 'Выполненные гектары по данным техники', 'Технологическая карта задает операции и нормы ресурсов. Трек машины и границы поля позволяют рассчитать выработку и проверить повторные проходы.'],
    ['AgroSignal', 'Урожай от комбайна до весовой', 'Комбайн, грузовик, весовая и склад связаны в системе. Видны движение урожая, расход ГСМ, простои и отклонения от задания.'],
    ['AssistAgro', 'Осмотры и снимки в истории поля', 'Фотографии с координатами, спутниковые данные и материалы БПЛА. Осмотры можно вести офлайн, результаты сохраняются по полю и дате.'],
    ['Документы и 1С', 'Производственный факт без повторного ввода', 'Из данных о работах формируются путевые и учетные листы, акты и списания. Настраиваем передачу сведений в учетную систему.'],
  ],
  [
    ['Минсельхоз России', 'Защита ведомственных систем', 'АПЦ определена поставщиком услуг информационной безопасности Минсельхоза России на 2025-2026 годы.'],
    ['Аудит и пентест', 'Проверка реальных путей атаки', 'Внешний и внутренний пентест, моделирование действий злоумышленника, фишинговые проверки. Перечень уязвимостей и приоритеты устранения.'],
    ['Внедрение и аттестация', 'Средства защиты и документация', 'Проектируем защиту, поставляем и настраиваем СЗИ. Готовим документацию и проводим аттестацию информационных систем, включая ГИС.'],
    ['Сопровождение', 'Работа с уязвимостями и инцидентами', 'Учет активов, сопровождение установленных средств защиты, анализ событий безопасности. Помогаем команде реагировать на инциденты.'],
  ],
  [
    ['АгроАкадемия', 'Курсы ФГИС в 44 аграрных вузах', 'Практика на эмуляторах ФГИС "Зерно", "Семеноводство" и ЕФГИС ЗСН. Студенты отрабатывают действия без изменения реальных данных.'],
    ['Применение ИИ', 'Документы и аналитика в работе сотрудника', 'Практические задания на материалах АПК: поставить задачу ИИ, подготовить документ, разобрать данные и проверить полученный результат.'],
    ['Информационная безопасность', 'Действия сотрудников и управление защитой', 'Программы для руководителей и специалистов: организация защиты информации, работа с учетными записями, распознавание фишинга и сообщение об инциденте.'],
    ['Для организаций', 'Корпоративные курсы и модули для вузов', 'Очное и дистанционное обучение, программы ДПО и повышение квалификации преподавателей. Модули для включения в действующие дисциплины.'],
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
  ['Spring', '46-spring-1.svg'],
  ['MySQL', '37-mysql-1.svg'],
  ['Node.js', '38-nodejs-2.svg'],
  ['PostgreSQL', '42-postgresql-1.svg'],
  ['Python', '43-python-2.svg'],
  ['Java', '32-java-2.svg'],
  ['React', '44-react-2.svg'],
  ['Redis', '45-redis-1.svg'],
  ['Git', '13-git-2.svg'],
  ['MongoDB', '36-mongodb-1.svg'],
  ['TypeScript', '47-typescript-1.svg'],
  ['Vue.js', '48-vuejs-1.svg'],
  ['HTML5', '21-html5-2.svg'],
  ['AWS', '06-aws-1.svg'],
  ['CSS3', '07-css3-2.svg'],
  ['Docker', '08-docker-2.svg'],
  ['Google Cloud', '14-google-cloud-2.svg'],
  ['JavaScript', '33-javascript-2.svg'],
  ['Kubernetes', '34-kubernetes-1.svg'],
  ['Linux', '35-linux-1.svg'],
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
          description="Разрабатываем системы под процессы предприятия и связываем их с 1С, ERP и отраслевыми ФГИС. Реализуем проект самостоятельно или с технологическими партнерами: от обследования и архитектуры до запуска и сопровождения."
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
          role="img"
          aria-label="Технологический стек"
        >
          {technologies.map(([name, file]) => (
            <img key={name} src={A + file} alt={name} />
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
              'Проверяем интеграции на пилоте и согласуем критерии приемки.',
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
    before: '20',
    beforeUnit: 'часов',
    after: '15',
    afterUnit: 'минут',
    beforeText: '20 часов в неделю на ручную подготовку отчетности',
    afterText: '15 минут в неделю после внедрения интеграционного модуля',
  },
  {
    logo: '23-image-2.png',
    name: 'ФНЦ "ВНИТИП"',
    category: 'Платформенное решение',
    title: 'Данные для селекции птицы',
    description:
      'Учет продуктивности и родственных связей птицы, расчет селекционных показателей.',
    point: 'Расчет селекционных показателей',
    before: 'Вручную',
    after: 'x10',
    beforeText: 'Ручная подготовка селекционных расчетов',
    afterText: 'Автоматизированный расчет показателей',
  },
  {
    logo: '25-image-3.png',
    name: 'Росагролизинг',
    category: 'Прикладной ИИ',
    title: 'Управление документооборотом',
    description:
      'Обработка входящих запросов, подготовка договоров и контроль исполнения с помощью ИИ-агентов.',
    point: 'Скорость обработки документов',
    before: 'Вручную',
    after: '+40%',
    beforeText: 'Ручная обработка входящих документов',
    afterText: 'Скорость обработки выросла на 40%',
  },
];
function Cases() {
  return (
    <section id="projects" className="projects rounded-section">
      <div className="wrap">
        <Heading
          tag="Проекты"
          line1="Опыт, подтвержденный"
          line2="работающими системами"
          description="Реализованные проекты и изменения в работе заказчиков после внедрения."
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
              <div className="case-comparison">
                <div>
                  <span className="metric-label">До</span>
                  <strong className={c.before === 'Вручную' ? 'metric-manual' : undefined}>{c.before}<small>{c.beforeUnit}</small></strong>
                </div>
                <span className="metric-arrows" aria-hidden="true">
                  ››››››
                </span>
                <div className="metric-after">
                  <span className="metric-label">После</span>
                  <strong>{c.after}<small>{c.afterUnit}</small></strong>
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
        description="Расскажите о задаче и действующих системах. Подключим нужных специалистов и предложим подходящий формат первого разговора."
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

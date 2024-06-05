import styles from './app.module.css';
import data from './data.json';
import { useState } from 'react';

export const App = () => {
	const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const handleNextStep = () => {
		setActiveIndex((newActiveIndex) => newActiveIndex + 1);
	};

	const handlePrevStep = () => {
		setActiveIndex((newActiveIndex) => newActiveIndex - 1);
	};

	const handleInBegin = () => {
		setActiveIndex(0);
	};

	const isFirstStep = activeIndex === 0;
	const isLastStep = activeIndex === steps.length - 1;

	// И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала

	// И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
						{steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{steps.map((step, index) => {
							return (
								<li
									key={step.id}
									className={
										styles['steps-item'] +
										' ' +
										(index <= activeIndex ? styles['done'] : '') +
										' ' +
										(index === activeIndex ? styles['active'] : '')
									}
								>
									{/* Для того, чтобы вычислить необходимый класс используйте активный индекс, текущий индекс, а также тернарные операторы */}
									<button
										onClick={() => {
											setActiveIndex(index);
										}}
										className={styles['steps-item-button']}
									>
										{index + 1}
									</button>
									{/* При клике на кнопку установка выбранного шага в качестве активного */}
									{step.title}
								</li>
							);
						})}
					</ul>
					<div className={styles['buttons-container']}>
						<button
							disabled={isFirstStep}
							onClick={handlePrevStep}
							className={styles.button}
						>
							Назад
						</button>
						<button
							onClick={isLastStep ? handleInBegin : handleNextStep}
							className={styles.button}
						>
							{isLastStep ? 'Начать сначала' : 'Далее'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

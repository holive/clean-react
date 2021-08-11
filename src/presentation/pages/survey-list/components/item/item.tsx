import styles from './item-styles.scss'
import { IconName, Icon } from '@/presentation/components'
import React from 'react'
import { LoadSurveyList } from '@/domain/usecases'

type Props = {
  survey: LoadSurveyList.Model
}

const SurveyItem: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown
  return (
    <li className={styles.surveyItemWrap}>
      <div className={styles.surveyContent}>
        <Icon className={styles.iconWrap} iconName={iconName} />
        <time>
          <span data-testid='day' className={styles.day}>
            {survey.date.getDate().toString().padStart(2, '0')}
          </span>
          <span data-testid='month' className={styles.month}>
            {survey.date
              .toLocaleString('pt-BR', { month: 'short' })
              .replace('.', '')}
          </span>
          <span data-testid='year' className={styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid='question'>{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveyItem

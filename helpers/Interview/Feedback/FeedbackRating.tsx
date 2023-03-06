import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

export enum ReactionE {
    VeryDissatisfied,
    Dissatisfied,
    Neutral,
    Satisfied,
    VerySatisfied,
}

export const getReactionComponent = (reactionType: ReactionE) => {
    switch (reactionType) {
        case ReactionE.VeryDissatisfied:
            return <SentimentVeryDissatisfiedIcon color="error" />;
        case ReactionE.Dissatisfied:
            return <SentimentDissatisfiedIcon color="error" />
        case ReactionE.Neutral:
            return <SentimentSatisfiedIcon color="warning" />
        case ReactionE.Satisfied:
            return <SentimentSatisfiedAltIcon color="success" />
        case ReactionE.VerySatisfied:
            return <SentimentVerySatisfiedIcon color="success" />
    }
}
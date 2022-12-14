import {pointIconMap, pointTitleMap} from '../maps';
import {formatDate, formatNumber, formatTime} from '../utils';
import Presenter from './presenter';

/**
 * @extends {Presenter<ListView>}
 */
export default class ListPresenter extends Presenter {
  constructor() {
    super(...arguments);

    this.updateView();
    this.pointsModel.addEventListener('filter', this.handlePointModelFilter.bind(this));
    this.pointsModel.addEventListener('sort', this.handlePointModelSort.bind(this));
  }

  updateView() {
    const points = this.pointsModel.list();
    const pointViewStates = points.map(this.createPointViewState, this);

    this.view.setItems(pointViewStates);
  }

  /**
   * @param {PointAdapter} point
   */
  createPointViewState(point) {
    const destination = this.destinationsModel.findById(point.destinationId);
    const offerGroup = this.offerGroupsModel.findById(point.type);

    const OfferViewStates = offerGroup.items
      .filter((offer) =>
        point.offerIds.includes(offer.id)
      )
      .map((offer) => ({
        title: offer.title,
        price: formatNumber(offer.price),
      }));

    return {
      date: formatDate(point.startDate),
      icon: pointIconMap[point.type],
      title: `${pointTitleMap[point.type]} ${destination.name}`,
      startTime: formatTime(point.startDate),
      startDate: point.startDate,
      endTime: formatTime(point.endDate),
      endDate: point.endDate,
      basePrice: formatNumber(point.basePrice),
      offers: OfferViewStates,
    };
  }

  handlePointModelFilter() {
    this.updateView();
  }

  handlePointModelSort() {
    this.updateView();
  }
}

class Book < ActiveFedora::Base
  has_many :relators, predicate: ::RDF::Vocab::Bibframe.relatedTo
  has_many :publications, predicate: ::RDF::Vocab::Bibframe::publication, class_name: 'Provider'

  accepts_nested_attributes_for :relators, :allow_destroy => true, reject_if: proc { |attrs| attrs['agent_id'].blank? }
  accepts_nested_attributes_for :publications




end
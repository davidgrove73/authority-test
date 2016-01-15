class BooksController < ApplicationController
  layout 'application'
  def new
    @book  = Book.new
    @book.relators.build
  end

  def create
    @book = Book.new(book_params);
    @book.save
    redirect_to @book
  end

  def show
    @book = Book.find(URI.decode(params[:id]))
  end

  def edit
    @book = Book.find(URI.decode(params[:id]))
  end

  private

  def book_params
    params[:book].permit(:language, :origin_date, titles_attributes: [[:id, :value, :subtitle, :lang, :type, :_destroy]],
                         relators_attributes: [[ :id, :agent_id, :role, :_destroy ]], subjects: [[:id]], note:[]).tap do |fields|
      # remove any inputs with blank values
      fields['titles_attributes'] = fields['titles_attributes'].select {|k,v| v['value'].present? && (v['id'].present? || v['_destroy'] != '1')} if fields['titles_attributes'].present?

      #remove any agents whit blank agent_id
      #remove any agents whith no relator_id and destroy set to true (this happens when a user has added a relator in the interface
      # and deleted it again before saving)
      fields['relators_attributes'] = fields['relators_attributes'].select {|k,v| v['agent_id'].present? && (v['id'].present? || v['_destroy'] != '1')} if fields['relators_attributes'].present?
    end
  end


end
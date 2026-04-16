<?php

namespace App\Filament\Resources\MemberReports\Tables;

use Filament\Tables;
use Filament\Forms;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use App\Models\Member;
use Filament\Tables\Filters\SelectFilter;

class MemberReportsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->defaultSort('created_at', 'desc')

            ->columns([


                Tables\Columns\TextColumn::make('id')->sortable(),

               Tables\Columns\TextColumn::make('login_action')
    ->label('Action')
    ->default('View Member')
    ->color('primary')
    ->weight('bold')
   
    ->url(fn ($record) => route('admin.login.member', $record->id))
    ->openUrlInNewTab(),

                Tables\Columns\TextColumn::make('user_id')
                    ->searchable()
                    ->placeholder('NA'),
                Tables\Columns\TextColumn::make('sponsor.user_id')
                    ->label('Sponsor ID')
                    ->placeholder('NA'),
                Tables\Columns\TextColumn::make('fullname')->searchable()->placeholder('NA'),

                Tables\Columns\TextColumn::make('parent_id')->placeholder('NA'),
                Tables\Columns\TextColumn::make('position')->placeholder('NA'),
                Tables\Columns\TextColumn::make('package_step')->placeholder('NA'),
                Tables\Columns\TextColumn::make('builtup_left_pv')->placeholder('NA'),
                Tables\Columns\TextColumn::make('builtup_right_pv')->placeholder('NA'),
                Tables\Columns\TextColumn::make('pv')->placeholder('NA'),
                Tables\Columns\TextColumn::make('total_left_bv')->placeholder('NA'),
                Tables\Columns\TextColumn::make('total_right_bv')->placeholder('NA'),
                Tables\Columns\TextColumn::make('carry_forward_left')->placeholder('NA'),
                Tables\Columns\TextColumn::make('carry_forward_right')->placeholder('NA'),
                Tables\Columns\TextColumn::make('is_active')->label('Active')->placeholder('NA'),

                Tables\Columns\TextColumn::make('dob')->date('d-m-Y')->placeholder('NA'),
                Tables\Columns\TextColumn::make('gender')->placeholder('NA'),
                Tables\Columns\TextColumn::make('pan_number')->label('PAN')->placeholder('NA'),

                Tables\Columns\TextColumn::make('mobile_no')->searchable()->placeholder('NA'),
                Tables\Columns\TextColumn::make('email')->searchable()->placeholder('NA'),

                Tables\Columns\TextColumn::make('address')
                    ->limit(20)
                    ->tooltip(fn($record) => $record->address)
                    ->placeholder('NA'),

                Tables\Columns\TextColumn::make('pin_code')->placeholder('NA'),
                Tables\Columns\TextColumn::make('state')->placeholder('NA'),
                Tables\Columns\TextColumn::make('city')->placeholder('NA'),
                Tables\Columns\TextColumn::make('district')->placeholder('NA'),

                // Shipping
                Tables\Columns\TextColumn::make('shipping_address')->limit(20)->placeholder('NA'),
                Tables\Columns\TextColumn::make('shipping_state')->placeholder('NA'),
                Tables\Columns\TextColumn::make('shipping_city')->placeholder('NA'),
                Tables\Columns\TextColumn::make('shipping_district')->placeholder('NA'),
                Tables\Columns\TextColumn::make('shipping_pin_code')->placeholder('NA'),

                // Nominee
                Tables\Columns\TextColumn::make('nominee_name')->placeholder('NA'),
                Tables\Columns\TextColumn::make('nominee_relation')->placeholder('NA'),
                Tables\Columns\TextColumn::make('nominee_mobile_no')->placeholder('NA'),
                Tables\Columns\TextColumn::make('nominee_address')->limit(20)->placeholder('NA'),
                Tables\Columns\TextColumn::make('nominee_state')->placeholder('NA'),
                Tables\Columns\TextColumn::make('nominee_city')->placeholder('NA'),
                Tables\Columns\TextColumn::make('nominee_district')->placeholder('NA'),
                Tables\Columns\TextColumn::make('nominee_pin_code')->placeholder('NA'),

                Tables\Columns\TextColumn::make('status')->placeholder('NA'),

                Tables\Columns\TextColumn::make('activation_date')
                    ->date('d-m-Y')
                    ->placeholder('NA'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Joining Date')
                    ->date('d-m-Y'),

                Tables\Columns\TextColumn::make('updated_at')
                    ->date('d-m-Y')
                    ->placeholder('NA'),
            ])

            ->filters([
                Filter::make('date')
                    ->form([
                        Forms\Components\DatePicker::make('from'),
                        Forms\Components\DatePicker::make('to'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['from'], fn($q) => $q->whereDate('created_at', '>=', $data['from']))
                            ->when($data['to'], fn($q) => $q->whereDate('created_at', '<=', $data['to']));
                    }),

                SelectFilter::make('state')
                    ->options(fn() => Member::query()->pluck('state', 'state')->toArray()),

                SelectFilter::make('is_active')
                    ->label('Active Status')
                    ->options([
                        1 => 'Active',
                        0 => 'Inactive',
                    ]),
            ])

            ->toolbarActions([]); // ❌ no create   
    }
}

